/**
 * Upload a file to Directus
 */
export async function uploadFileToDirectus(
  directus: any,
  folderId: string,
  filename: string,
  data: Buffer,
  type: string,
): Promise<string> {
  const { uploadFiles } = await import("@directus/sdk");

  const form = new FormData();
  form.append("folder", folderId);
  form.append("file", new Blob([data], { type }), filename);

  const result = await directus.request(uploadFiles(form));
  return result.id as string;
}
