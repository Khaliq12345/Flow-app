import { readItems } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  try {
    const { limit, offset } = getQuery(event);

    const generations = await useDirectusAdmin().request(
      readItems("generations", {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      }),
    );

    return generations;
  } catch (error) {
    console.log("Error fetching generations:", error);
  }
});
