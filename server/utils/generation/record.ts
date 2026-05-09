/**
 * Create generation record in Directus
 */
export async function createGenerationRecord(
  directus: any,
  projectName: string,
  templateId: string,
  userId: string,
  parentFolderId: string,
  isSkippingPayment: boolean,
) {
  const { createItem } = await import("@directus/sdk");

  const generation = await directus.request(
    createItem("generations", {
      name: projectName,
      template_id: templateId,
      user_id: userId,
      input_media: parentFolderId,
      payment_status: isSkippingPayment ? "paid" : "pending",
    }),
  );

  return generation;
}
