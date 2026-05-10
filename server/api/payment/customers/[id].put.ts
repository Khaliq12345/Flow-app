import { updateItem } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  try {
    const userFolderId = getRouterParam(event, "id") as string;
    const { fedapayId } = await readBody(event);

    await useDirectusAdmin().request(
      updateItem("user_folder", userFolderId, {
        fedapay_id: fedapayId,
      }),
    );

    return { userFolderId, fedapayId };
  } catch (err: any) {
    // Laisser passer les erreurs H3 (createError) telles quelles
    if (err.statusCode) throw err;

    console.error(
      "[payment/customers/[id].put] Erreur inattendue:",
      err?.message ?? err,
    );
    throw createError({
      statusCode: 500,
      message: `[payment/customers/[id].put] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
