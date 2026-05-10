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
    const inputsFolderId: string = generation.input_media;

    // 2. Récupérer le dossier parent (projet) du dossier inputs
    const inputsFolder = await directus.request(
      readFolders({
        filter: { id: { _eq: inputsFolderId } },
        fields: ["id", "parent"],
      }),
    );

    const projectFolderId: string = inputsFolder[0]?.parent;

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
    }

    // 4. Supprimer les dossiers
    if (projectFolderId && inputsFolderId) {
      await directus.request(deleteFolders([projectFolderId, inputsFolderId]));
      console.log("[generation/delete] Dossier projet et inputs supprimé");
    }

    // 6. Supprimer la génération
    await directus.request(deleteItem("generations", generationId));

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
