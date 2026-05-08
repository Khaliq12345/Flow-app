import { useDirectusAdmin } from "~~/server/utils/directus";
import { createFolder, createItem, uploadFiles } from "@directus/sdk";

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        message: "[generation/add.post] Aucune donnée reçue",
      });
    }

    const files: Record<
      string,
      { filename: string; data: Buffer; type: string }
    > = {};
    let templateId: string | null = null;
    let folderId: string | null = null;
    let userId: string | null = null;
    let projectName: string | null = null;
    let textFile: { filename: string; data: Buffer; type: string } | null =
      null;

    for (const part of formData) {
      const partName = part.name;

      if (!partName) continue;

      if (partName === "templateId") {
        templateId = part.data.toString("utf-8");
        continue;
      }

      if (partName === "folderId") {
        folderId = part.data.toString("utf-8");
        continue;
      }

      if (partName === "userId") {
        userId = part.data.toString("utf-8");
        continue;
      }

      if (partName === "name") {
        projectName = part.data.toString("utf-8");
        continue;
      }

      if (partName === "textFile" && part.filename) {
        textFile = {
          filename: part.filename,
          data: part.data,
          type: part.type || "text/plain",
        };
        continue;
      }

      if (part.filename) {
        files[partName] = {
          filename: part.filename,
          data: part.data,
          type: part.type || "application/octet-stream",
        };
      }
    }

    console.log("[generation/add.post] Template ID:", templateId);
    console.log("[generation/add.post] Folder ID:", folderId);
    console.log("[generation/add.post] User ID:", userId);
    console.log("[generation/add.post] Project Name:", projectName);
    console.log(
      "[generation/add.post] Fichiers images reçus:",
      Object.keys(files),
    );
    console.log(
      "[generation/add.post] Fichier texte reçu:",
      textFile ? textFile.filename : "Aucun",
    );

    if (!templateId) {
      throw createError({
        statusCode: 400,
        message: "[generation/add.post] Template ID manquant",
      });
    }
    if (!folderId) {
      throw createError({
        statusCode: 400,
        message: "[generation/add.post] Folder ID manquant",
      });
    }
    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "[generation/add.post] User ID manquant",
      });
    }
    if (!projectName) {
      throw createError({
        statusCode: 400,
        message: "[generation/add.post] Project name manquant",
      });
    }

    const directus = useDirectusAdmin();

    // 1. Créer le dossier principal avec le projectName dans folderId
    const projectFolder = await directus.request(
      createFolder({
        name: projectName,
        parent: folderId,
      }),
    );
    console.log("[generation/add.post] Dossier projet créé:", projectFolder.id);

    // 2. Créer le dossier "inputs" dans le dossier projet
    const inputsFolder = await directus.request(
      createFolder({
        name: "inputs",
        parent: projectFolder.id,
      }),
    );
    console.log("[generation/add.post] Dossier inputs créé:", inputsFolder.id);

    // 3. Helper : uploader un fichier dans le dossier inputs
    const uploadFile = async (
      filename: string,
      data: Buffer,
      type: string,
    ): Promise<string> => {
      const form = new FormData();
      form.append("folder", inputsFolder.id);
      form.append("file", new Blob([data], { type }), filename);

      const result = await directus.request(uploadFiles(form));
      return result.id as string;
    };

    // 4. Uploader tous les fichiers images
    for (const file of Object.values(files)) {
      const id = await uploadFile(file.filename, file.data, file.type);
      console.log(
        `[generation/add.post] Image uploadée: ${file.filename} → ${id}`,
      );
    }

    // 5. Uploader le fichier texte si présent
    if (textFile) {
      const id = await uploadFile(
        textFile.filename,
        textFile.data,
        textFile.type,
      );
      console.log(
        `[generation/add.post] Fichier texte uploadé: ${textFile.filename} → ${id}`,
      );
    }

    // 6. Créer l'entrée dans la collection "generations"
    // user_id est une relation M2O vers directus_users, on passe l'objet { id }
    const generation = await directus.request(
      createItem("generations", {
        name: projectName,
        template_id: templateId,
        user_id: { id: userId },
        input_media: inputsFolder.id,
        status: "payment_pending",
      }),
    );

    console.log("[generation/add.post] Génération créée:", generation.id);

    return {
      success: true,
      generationId: generation.id,
      projectFolderId: projectFolder.id,
      inputsFolderId: inputsFolder.id,
      imageFilesCount: Object.keys(files).length,
      hasTextFile: !!textFile,
    };
  } catch (err: any) {
    if (err.statusCode) throw err;

    console.error(
      "[generation/add.post] Erreur inattendue:",
      err?.message ?? err,
    );
    throw createError({
      statusCode: 500,
      message: `[generation/add.post] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
