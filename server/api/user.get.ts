import { readItems, readUser } from "@directus/sdk";

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
    const user = await adminClient.request(readUser(userId));
    const folders = await adminClient.request(
      readItems("user_folder", {
        filter: {
          user_id: { _eq: userId },
        },
        limit: 1,
      }),
    );

    const userFolder = folders.length > 0 ? folders[0] : null;

    return {
      ...user,
      userFolder,
    };
  } catch (error: any) {
    console.error(`[Erreur API récupération utilisateur]: ${error.message}`);
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: "Échec de la récupération des données utilisateur",
    });
  }
});
