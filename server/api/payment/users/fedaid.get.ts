import { readItems, updateItem } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  try {
    const email = getQuery(event).email as string;

    console.log("[payment/users/fedaid.get] Recherche du user_folder pour email:", email);

    const folders = await useDirectusAdmin().request(
      readItems("user_folder", {
        filter: { email: { _eq: email } },
        limit: 1,
        fields: ["id", "email", "fedapay_id"],
      }),
    );

    const userFolder = folders?.[0] ?? null;
    return userFolder;
  } catch (err: any) {
    // Laisser passer les erreurs H3 (createError) telles quelles
    if (err.statusCode) throw err;

    console.error("[payment/users/fedaid.get] Erreur inattendue:", err?.message ?? err);
    throw createError({
      statusCode: 500,
      message: `[payment/users/fedaid.get] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
