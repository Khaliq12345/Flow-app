import { useDirectusAdmin } from "~~/server/utils/directus";
import {
  deleteItem,
  deleteFolder,
  deleteFiles,
  readFiles,
  readFolders,
  readItem,
  deleteFolders,
} from "@directus/sdk";

export default defineEventHandler(async (event) => {
  try {
    const generationId = getRouterParam(event, "id");

    if (!generationId) {
      throw createError({
        statusCode: 400,
        message: "[generation/delete] Generation ID manquant",
      });
    }

    const directus = useDirectusAdmin();

    // 1. Récupérer la génération pour avoir l'input_media (dossier inputs)
    const generation = await directus.request(
      readItem("generations", generationId, {
        fields: ["id", "input_media"],
      }),
    );

    if (!generation) {
      throw createError({
        statusCode: 404,
        message: "[generation/delete] Génération introuvable",
      });
    }

    console.log("[generation/delete] Génération trouvée:", generation.id);
    console.log("[generation/delete] Dossier inputs:", generation.input_media);

    const inputsFolderId: string = generation.input_media;

    // 2. Récupérer le dossier parent (projet) du dossier inputs
    const inputsFolder = await directus.request(
      readFolders({
        filter: { id: { _eq: inputsFolderId } },
        fields: ["id", "parent"],
      }),
    );

    const projectFolderId: string = inputsFolder[0]?.parent;
    console.log("[generation/delete] Dossier projet:", projectFolderId);

    // 3. Supprimer tous les fichiers dans le dossier inputs
    const filesInInputs = await directus.request(
      readFiles({
        filter: { folder: { _eq: inputsFolderId } },
        fields: ["id"],
      }),
    );

    if (filesInInputs.length > 0) {
      const fileIds = filesInInputs.map((f: any) => f.id);
      await directus.request(deleteFiles(fileIds));
      console.log(
        `[generation/delete] ${fileIds.length} fichier(s) supprimé(s)`,
      );
    }

    // 4. Supprimer le dossier
    if (projectFolderId && inputsFolderId) {
      await directus.request(deleteFolders([projectFolderId, inputsFolderId]));
      console.log("[generation/delete] Dossier projet et inputs supprimé");
    }

    // 6. Supprimer la génération
    await directus.request(deleteItem("generations", generationId));
    console.log("[generation/delete] Génération supprimée:", generationId);

    return {
      success: true,
      generationId,
    };
  } catch (err: any) {
    if (err.statusCode) throw err;

    console.error(
      "[generation/delete] Erreur inattendue:",
      err?.message ?? err,
    );
    throw createError({
      statusCode: 500,
      message: `[generation/delete] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
