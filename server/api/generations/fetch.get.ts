import { readItems } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  try {
    const { limit, offset } = getQuery(event);

    const generations = await useDirectusAdmin().request(
      readItems("generations", {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
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
