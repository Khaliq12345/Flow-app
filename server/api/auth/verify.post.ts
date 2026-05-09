import { registerUserVerify } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event): Promise<void> => {
  const { token } = getQuery(event);
  const adminClient = useDirectusAdmin();

  if (!token) {
    throw createError({
      statusCode: 400,
      message: "Jeton de vérification manquant.",
    });
  }

  try {
    await adminClient.request(registerUserVerify(token as string));
  } catch (error) {
    console.error(`Erreur de vérification - ${error}`);

    throw createError({
      statusCode: 500,
      message:
        "La vérification a échoué. Il semble que le jeton soit expiré ou invalide.",
    });
  }
});
