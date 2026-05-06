import { createDirectus, rest, staticToken } from "@directus/sdk";

export const useDirectusAdmin = () => {
  const config = useRuntimeConfig();
  return createDirectus(config.public.directusUrl)
    .with(rest())
    .with(staticToken(config.staticTokenPrivate));
};
