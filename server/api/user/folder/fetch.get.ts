import { useDirectusAdmin } from "~~/server/utils/directus";
import { readItems } from "@directus/sdk";

export default defineEventHandler(async (event) => {
  try {
    const directus = useDirectusAdmin();
    const { userId } = getQuery(event);

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "[user/folder/fetch.get] ID utilisateur manquant.",
      });
    }

    return await directus.request(
      readItems("user_folders", {
        filter: {
          user_id: {
            _eq: userId,
          },
        },
      }),
    );
  } catch (err: any) {
    if (err.statusCode) throw err;

    console.error(
      "[user/folder/fetch.get] Erreur inattendue:",
      err?.message ?? err,
    );
    throw createError({
      statusCode: 500,
      message: `[user/folder/fetch.get] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
