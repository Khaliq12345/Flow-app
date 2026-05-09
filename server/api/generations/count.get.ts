import { readItems } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = getQuery(event);
    const count = await useDirectusAdmin().request(
      readItems("generations", {
        filter: {
          user_id: userId as string,
        },
        aggregate: { count: "*" },
      }),
    );
    // console.log("Total generations of type", type, ":", count[0]?.count);
    return count[0]?.count || 0;
  } catch (err: any) {
    if (err.statusCode) throw err;

    console.error("[generation/count] Erreur inattendue:", err?.message ?? err);
    throw createError({
      statusCode: 500,
      message: `[generation/count] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
