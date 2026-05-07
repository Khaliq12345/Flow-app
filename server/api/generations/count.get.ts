import { readItems } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  try {
    const count = await useDirectusAdmin().request(
      readItems("generations", {
        filter: {},
        aggregate: { count: "*" },
      }),
    );
    // console.log("Total generations of type", type, ":", count[0]?.count);
    return count[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching generations count:", error);
  }
});
