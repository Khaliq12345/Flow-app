export type TemplateInput = {
  type: "image" | "text";
  name: string;
  description: string;
  input?: "long" | "short";
};

export type Template = {
  id: string;
  sort: number | null;
  date_created: string; // ISO 8601
  date_updated: string | null;
  name: string;
  description: string;
  price: string;
  inputs: TemplateInput[];
  preview: string; // uuid of media
  type: "video" | "image";
};
