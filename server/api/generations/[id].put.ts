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

    const allowedFields = ["payment_status", "transaction_id", "status"];

    const updateData: Record<string, any> = {};

    // 2. Map body keys to updateData if they are in the allowed list
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    // Check if there is actually anything to update
    if (Object.keys(updateData).length === 0) {
      throw createError({
        statusCode: 400,
        message: "Aucune donnée valide fournie pour la mise à jour.",
      });
    }

    // 4. Perform the dynamic update
    const updatedGeneration = await directus.request(
      updateItem("generations", generationId, updateData),
    );

    return {
      success: true,
      generationId: updatedGeneration.id,
      updatedFields: Object.keys(updateData),
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
