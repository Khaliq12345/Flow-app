export interface ParsedFormData {
  files: Record<string, { filename: string; data: Buffer; type: string }>;
  templateId: string | null;
  folderId: string | null;
  userId: string | null;
  projectName: string | null;
  textFile: { filename: string; data: Buffer; type: string } | null;
  isSkippingPayment: boolean | null;
}
