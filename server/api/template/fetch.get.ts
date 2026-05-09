import { readItems } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  try {
    const { type, limit, offset } = getQuery(event);

    const templates = await useDirectusAdmin().request(
      readItems("templates", {
        filter: { type: { _eq: type } },
        meta: "total_count",
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      }),
    );

    return templates;
  } catch (error) {
    console.log("Error fetching templates:", error);
  }
});
