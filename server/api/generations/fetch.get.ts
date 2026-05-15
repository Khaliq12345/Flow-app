import { readItems } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  try {
    const { limit, offset, userId } = getQuery(event);

    const generations = await useDirectusAdmin().request(
      readItems("generations", {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        filter: {
          user_id: userId as string,
        },
        fields: ["*", "template_id.price"], // many-to-one : pas de tableau intermédiaire
      }),
    );

    return generations;
  } catch (err: any) {
    if (err.statusCode) throw err;

    console.error("[generation/fetch] Erreur inattendue:", err?.message ?? err);
    throw createError({
      statusCode: 500,
      message: `[generation/fetch] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
