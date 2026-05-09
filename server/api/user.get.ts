import { readUser, readItems } from "@directus/sdk";

export default defineEventHandler(async (event) => {
  const adminClient = useDirectusAdmin();
  const { userId } = getQuery(event);

  // 1. Validation
  if (!userId || typeof userId !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing or invalid userId parameter",
    });
  }

  try {
    // 2. Execution
    const [user, folders] = await Promise.all([
      adminClient.request(readUser(userId)),
      adminClient.request(
        readItems("user_folder", {
          filter: {
            user_id: { _eq: userId },
          },
          limit: 1,
        }),
      ),
    ]);

    return {
      ...user,
      userFolder: folders[0] || null,
    };
  } catch (error: any) {
    console.error(`[User API Error]: ${error.message}`);

    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: "Failed to fetch user data",
    });
  }
});
