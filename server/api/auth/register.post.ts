import { createUser, registerUser } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Use your auto-imported utility
  const adminClient = useDirectusAdmin();

  try {
    const newUser = await adminClient.request(
      registerUser(body.email, body.password, {
        first_name: body.first_name,
        last_name: body.last_name,
      }),
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Signup Failed",
    });
  }
});
