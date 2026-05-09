export interface User {
  id: string;
  status: "active" | "archived" | "invited" | "suspended";
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  avatar: string | null;
  location: string | null;
  title: string | null;
  description: string | null;
  tags: string[] | null;
  language: string | null;
  last_access: string;
  last_page: string | null;
  provider: string;
  external_identifier: string | null;
  auth_data: Record<string, any> | null;
  email_notifications: boolean;
  appearance: string | null;
  theme_dark: string | null;
  theme_light: string | null;
  theme_dark_overrides: Record<string, any> | null;
  theme_light_overrides: Record<string, any> | null;
  text_direction: "auto" | "ltr" | "rtl";
  role: string; // Role ID
  policies: any[];
  tfa_secret: string | null;
  token: string | null;
  folderInfo: {
    fedapayId: string;
    folderId: string;
    userId: string;
    remaining_images: number;
    remaining_videos: number;
  };
}
