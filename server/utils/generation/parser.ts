import type { MultiPartData } from "h3";
import type { ParsedFormData } from "./types";

/**
 * Parse multipart form data and extract generation fields
 */
export function parseGenerationFormData(
  formData: MultiPartData[],
): ParsedFormData {
  const files: Record<
    string,
    { filename: string; data: Buffer; type: string }
  > = {};
  let templateId: string | null = null;
  let folderId: string | null = null;
  let userId: string | null = null;
  let projectName: string | null = null;
  let textFile: { filename: string; data: Buffer; type: string } | null = null;

  for (const part of formData) {
    const partName = part.name;

    if (!partName) continue;

    if (partName === "templateId") {
      templateId = part.data.toString("utf-8");
      continue;
    }

    if (partName === "folderId") {
      folderId = part.data.toString("utf-8");
      continue;
    }

    if (partName === "userId") {
      userId = part.data.toString("utf-8");
      continue;
    }

    if (partName === "name") {
      projectName = part.data.toString("utf-8");
      continue;
    }

    if (partName === "textFile" && part.filename) {
      textFile = {
        filename: part.filename,
        data: part.data,
        type: part.type || "text/plain",
      };
      continue;
    }

    if (part.filename) {
      files[partName] = {
        filename: part.filename,
        data: part.data,
        type: part.type || "application/octet-stream",
      };
    }
  }

  return {
    files,
    templateId,
    folderId,
    userId,
    projectName,
    textFile,
  };
}
