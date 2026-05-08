/**
 * Create generation record in Directus
 */
export async function createGenerationRecord(
  directus: any,
  projectName: string,
  templateId: string,
  userId: string,
  inputsFolderId: string,
) {
  const { createItem } = await import("@directus/sdk");

  const generation = await directus.request(
    createItem("generations", {
      name: projectName,
      template_id: templateId,
      user_id: { id: userId },
      input_media: inputsFolderId,
      status: "payment_pending",
    }),
  );

  return generation;
}
