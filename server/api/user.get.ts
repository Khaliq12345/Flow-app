import { readUser } from "@directus/sdk";

export default defineEventHandler(async (event) => {
  const adminClient = useDirectusAdmin();
  const { userId } = getQuery(event);

  if (!userId || typeof userId !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Paramètre userId manquant ou invalide",
    });
  }

  try {
    return await adminClient.request(readUser(userId));
  } catch (error: any) {
    console.error(`[Erreur API récupération utilisateur]: ${error.message}`);
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: "Échec de la récupération des données utilisateur",
    });
  }
});
