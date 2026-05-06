import { createUser } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Use your auto-imported utility
  const adminClient = useDirectusAdmin();

  try {
    const newUser = await adminClient.request(
      createUser({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
        role: "7725d8e5-f25b-4363-ab06-3cc3db9bfc27",
      }),
    );
    return newUser;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Directus Admin Action Failed",
    });
  }
});
