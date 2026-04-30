export interface MediaItem {
  name: string;
  description?: string;
  since: string;
  is_video: boolean;
  url: string;
  duration?: number;
  version?: string;
}
