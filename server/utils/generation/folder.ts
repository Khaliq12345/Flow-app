import { uploadFileToDirectus } from "./uploader";
import { createFolder } from "@directus/sdk";

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

  const allFiles = [];
  // Upload image files
  for (const file of Object.values(files)) {
    let fileId = await uploadFileToDirectus(
      directus,
      inputsFolder.id,
      file.filename,
      file.data,
      file.type,
    );
    allFiles.push(fileId);
  }

  // Upload text file if present
  if (textFile) {
    const textFileId = await uploadFileToDirectus(
      directus,
      inputsFolder.id,
      textFile.filename,
      textFile.data,
      textFile.type,
    );
    allFiles.push(textFileId);
  }

  return {
    projectFolder,
    inputsFolder,
    allFiles,
  };
}
