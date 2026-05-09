export interface Generations {
  id: string;
  name: string;
  user_id: string;
  template_id: string;
  input_media: string;
  status: "pending" | "completed" | "failed";
  outputs_media?: string;
}

export interface GenerationMedia {
  id: string;
  type: string;
}

export interface OutputMedia {
  id: string;
  type: string;
}
