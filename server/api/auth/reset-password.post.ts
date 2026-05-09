import { passwordReset } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event): Promise<any> => {
  const body = await readBody(event);
  const { token, password } = body;

  const adminClient = useDirectusAdmin();

  if (!token || !password) {
    throw createError({
      statusCode: 400,
      message: "Le jeton et le nouveau mot de passe sont requis.",
    });
  }

  try {
    await adminClient.request(passwordReset(token, password));
    return {
      message: "Ton mot de passe a été réinitialisé avec succès.",
    };
  } catch (error: any) {
    console.error(`Erreur réinitialisation mot de passe - ${error}`);

    throw createError({
      statusCode: 500,
      message:
        "Impossible de réinitialiser le mot de passe. Le lien est probablement expiré.",
    });
  }
});
