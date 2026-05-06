import type { Template } from "~/types/template";

export default () => {
  const fetchTemplates = async (
    type: string,
    limit: number,
    offset: number,
  ): Promise<Template[]> => {
    try {
      const templates = await $fetch<Template[]>("/api/template/fetch", {
        query: { type, limit, offset },
      });

      return templates;
    } catch (error) {
      console.error("Error fetching templates:", error);
      return [];
    }
  };

  const fetchTemplateCount = async (type: string): Promise<number> => {
    try {
      const count = await $fetch("/api/template/count", {
        query: { type },
      });
      return parseInt(count);
    } catch (error) {
      console.error("Error fetching template count:", error);
      return 0;
    }
  };

  return {
    fetchTemplates,
    fetchTemplateCount,
  };
};
