/**
 * Create generation record in Directus
 */
export async function createGenerationRecord(
  directus: any,
  projectName: string,
  projectType: string,
  templateId: string,
  userId: string,
  parentFolderId: string,
  isSkippingPayment: boolean,
  generationContent: Record<string, string | string[]>,
) {
  const { createItem } = await import("@directus/sdk");

  const generation = await directus.request(
    createItem("generations", {
      name: projectName,
      type: projectType,
      template_id: templateId,
      user_id: userId,
      input_media: parentFolderId,
      payment_status: isSkippingPayment ? "paid" : "pending",
      inputs_output: generationContent,
    }),
  );

  return generation;
}
