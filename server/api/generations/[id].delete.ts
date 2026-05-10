import { useDirectusAdmin } from "~~/server/utils/directus";
import {
  deleteItem,
  deleteFiles,
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
        fields: ["id", "input_media", "inputs_output"],
      }),
    );

    if (!generation) {
      throw createError({
        statusCode: 404,
        message: "[generation/delete] Génération introuvable",
      });
    }

    // 3. Supprimer tous les fichiers du generation
    await directus.request(deleteFiles(generation.inputs_output.files));
    await directus.request(
      deleteFolders([
        generation.inputs_output.project_folder,
        generation.inputs_output.input_folder,
      ]),
    );

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
