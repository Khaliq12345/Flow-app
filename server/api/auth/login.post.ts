import { createUser, login } from "@directus/sdk";
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
    return user;
  } catch (error) {
    console.log(`Error - ${error}`);
    throw createError({
      statusCode: 500,
      message: "Login Failed | Check email or password",
    });
  }
});
