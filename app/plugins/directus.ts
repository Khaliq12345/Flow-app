import {
  createDirectus,
  rest,
  readItem,
  readItems,
  staticToken,
} from "@directus/sdk";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  console.log(config.staticTokenPrivate);
  const directus = createDirectus(config.public.directusUrl)
    .with(rest())
    .with(staticToken(config.staticTokenPrivate));

  return {
    provide: { directus, readItem, readItems },
  };
});
