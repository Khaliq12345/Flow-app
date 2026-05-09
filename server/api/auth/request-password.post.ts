import { passwordRequest } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event): Promise<any> => {
  const body = await readBody(event);
  const { email } = body;
  const config = useRuntimeConfig();

  const adminClient = useDirectusAdmin();

  if (!email) {
    throw createError({
      statusCode: 400,
      message: "L'adresse e-mail est requise.",
    });
  }

  try {
    const resetUrl = `${config.public.url}/reset-password`;
    await adminClient.request(passwordRequest(email, resetUrl));

    return {
      status: "success",
      message:
        "Si cet e-mail correspond à un compte, un lien de réinitialisation a été envoyé.",
    };
  } catch (error: any) {
    console.error(`[PASSWORD_REQUEST_ERROR]: ${error.message}`);
    return {
      status: "success",
      message:
        "Si cet e-mail correspond à un compte, un lien de réinitialisation a été envoyé.",
    };
  }
});
