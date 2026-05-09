export interface Generations {
  id: string;
  name: string;
  user_id: string;
  template_id: string;
  input_media: string;
  status: "pending" | "completed" | "failed" | "payment_pending" | "approved";
  outputs_media?: string;
  payment_status: string;
}

export interface GenerationMedia {
  id: string;
  type: string;
}

export interface OutputMedia {
  id: string;
  type: string;
}

export interface CreateGenerationResponse {
  success: boolean;
  generationId: string;
  projectFolderId: string;
  inputsFolderId: string;
  imageFilesCount: number;
  hasTextFile: boolean;
}

export interface DeleteGenerationResponse {
  success: boolean;
  generationId: string;
}

export interface UpdateGenerationStatusPayload {
  userId: string;
}

export interface UpdateGenerationStatusResponse {
  success: boolean;
  generationId: string;
  status: string;
}
