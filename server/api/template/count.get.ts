import { readItems } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  try {
    const type = getQuery(event).type as string;
    const count = await useDirectusAdmin().request(
      readItems("templates", {
        filter: { type: { _eq: type } },
        aggregate: { count: "*" },
      }),
    );
    // console.log("Total templates of type", type, ":", count[0]?.count);
    return count[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching template count:", error);
  }
});
