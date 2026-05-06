import { createDirectus, rest, readItem, readItems } from "@directus/sdk";

const directus = createDirectus("http://178.104.216.21:8055/admin").with(
  rest(),
);

export default defineNuxtPlugin(() => {
  return {
    provide: { directus, readItem, readItems },
  };
});
