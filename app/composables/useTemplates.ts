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

  const fetchTemplatesCount = async (type: string): Promise<number> => {
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

  const fetchTemplateById = async (id: string): Promise<Template | null> => {
    try {
      const template = await $fetch<Template>(`/api/template/${id}`);
      return template;
    } catch (error) {
      console.error(`Error fetching template with id ${id}:`, error);
      return null;
    }
  };

  return {
    fetchTemplates,
    fetchTemplatesCount,
    fetchTemplateById,
  };
};
