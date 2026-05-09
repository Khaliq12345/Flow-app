import { login } from "@directus/sdk";
import { navigateTo } from "nuxt/app";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const adminClient = useDirectusAdmin();

  try {
    const user = await adminClient.request(
      login({
        email: body.email,
        password: body.password,
      }),
    );
    await navigateTo("/");
    return user;
  } catch (error) {
    console.log(`Error - ${error}`);
    throw createError({
      statusCode: 500,
      message: "Login Failed | Check email or password",
    });
  }
});
