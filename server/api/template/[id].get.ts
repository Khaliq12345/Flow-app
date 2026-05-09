import { readItem } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  console.log(`Fetching template with id: ${id}`);
  try {
    const template = await useDirectusAdmin().request(
      readItem("templates", id),
    );

    return template;
  } catch (error) {
    console.log(`Error fetching template with id ${id}:`, error);
  }
});
