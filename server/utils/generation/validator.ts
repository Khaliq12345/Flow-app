import type { ParsedFormData } from "./types";

/**
 * Validate required generation fields
 */
export function validateGenerationData(data: ParsedFormData): void {
  if (!data.templateId) {
    throw createError({
      statusCode: 400,
      message: "[generation/add.post] Template ID manquant",
    });
  }
  if (!data.folderId) {
    throw createError({
      statusCode: 400,
      message: "[generation/add.post] Folder ID manquant",
    });
  }
  if (!data.userId) {
    throw createError({
      statusCode: 400,
      message: "[generation/add.post] User ID manquant",
    });
  }
  if (!data.projectName) {
    throw createError({
      statusCode: 400,
      message: "[generation/add.post] Project name manquant",
    });
  }
  if (!data.projectType) {
    throw createError({
      statusCode: 400,
      message: "[generation/add.post] Project type manquant",
    });
  }
}
