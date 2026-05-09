import { useDirectusAdmin } from "~~/server/utils/directus";
import {
  parseGenerationFormData,
  validateGenerationData,
  createGenerationFolders,
  createGenerationRecord,
} from "~~/server/utils/generation/index";

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        message: "[generation/add.post] Aucune donnée reçue",
      });
    }

    // Parse form data
    const parsedData = parseGenerationFormData(formData);

    // Validate required fields
    validateGenerationData(parsedData);

    const directus = useDirectusAdmin();

    // Create folders and upload files
    const { projectFolder, inputsFolder } = await createGenerationFolders(
      directus,
      parsedData.projectName!,
      parsedData.folderId!,
      parsedData.files,
      parsedData.textFile,
    );

    // Create generation record
    const generation = await createGenerationRecord(
      directus,
      parsedData.projectName!,
      parsedData.templateId!,
      parsedData.userId!,
      inputsFolder.id,
    );

    return {
      success: true,
      generationId: generation.id,
      projectFolderId: projectFolder.id,
      inputsFolderId: inputsFolder.id,
      imageFilesCount: Object.keys(parsedData.files).length,
      hasTextFile: !!parsedData.textFile,
    };
  } catch (err: any) {
    if (err.statusCode) throw err;

    console.error(
      "[generation/add.post] Erreur inattendue:",
      err?.message ?? err,
    );
    throw createError({
      statusCode: 500,
      message: `[generation/add.post] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
