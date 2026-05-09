import { updateUser } from "@directus/sdk";

export default defineEventHandler(async (event) => {
  const adminClient = useDirectusAdmin();
  const { userId } = getQuery(event);
  const body = await readBody(event);

  // 1. Validation
  if (!userId || typeof userId !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing or invalid userId parameter",
    });
  }

  if (!body || typeof body !== "object") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing or invalid request body",
    });
  }

  try {
    // 2. Execution
    const user = await adminClient.request(updateUser(userId, body));
    return user;
  } catch (error: any) {
    console.error(`[User Update API Error]: ${error.message}`);
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: "Failed to update user data",
    });
  }
});
