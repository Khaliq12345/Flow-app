import { uploadFileToDirectus } from "./uploader";

/**
 * Create folder structure and upload files
 */
export async function createGenerationFolders(
  directus: any,
  projectName: string,
  parentFolderId: string,
  files: Record<string, { filename: string; data: Buffer; type: string }>,
  textFile: { filename: string; data: Buffer; type: string } | null,
) {
  const { createFolder } = await import("@directus/sdk");

  // Create project folder
  const projectFolder = await directus.request(
    createFolder({
      name: projectName,
      parent: parentFolderId,
    }),
  );

  // Create inputs folder
  const inputsFolder = await directus.request(
    createFolder({
      name: "inputs",
      parent: projectFolder.id,
    }),
  );

  // Upload image files
  for (const file of Object.values(files)) {
    await uploadFileToDirectus(
      directus,
      inputsFolder.id,
      file.filename,
      file.data,
      file.type,
    );
  }

  // Upload text file if present
  if (textFile) {
    await uploadFileToDirectus(
      directus,
      inputsFolder.id,
      textFile.filename,
      textFile.data,
      textFile.type,
    );
  }

  return {
    projectFolder,
    inputsFolder,
  };
}
