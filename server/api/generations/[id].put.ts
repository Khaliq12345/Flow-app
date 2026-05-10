import { useDirectusAdmin } from "~~/server/utils/directus";
import { readItem, updateItem } from "@directus/sdk";

export default defineEventHandler(async (event) => {
  try {
    const generationId = getRouterParam(event, "id") as string;
    const body = await readBody(event);

    if (!generationId) {
      throw createError({
        statusCode: 400,
        message: "[generation/[id].put] Generation ID manquant",
      });
    }

    const directus = useDirectusAdmin();

    // Check if generation exists
    const generation = await directus.request(
      readItem("generations", generationId, {
        fields: ["id", "status"],
      }),
    );

    if (!generation) {
      throw createError({
        statusCode: 404,
        message: "[generation/[id].put] Génération non trouvée",
      });
    }

    // Update status to pending and set user_id
    const updatedGeneration = await directus.request(
      updateItem("generations", generationId, {
        payment_status: body.status,
      }),
    );

    return {
      success: true,
      generationId: updatedGeneration.id,
      status: updatedGeneration.status,
    };
  } catch (err: any) {
    if (err.statusCode) throw err;

    console.error(
      "[generation/[id].put] Erreur inattendue:",
      err?.message ?? err,
    );
    throw createError({
      statusCode: 500,
      message: `[generation/[id].put] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
