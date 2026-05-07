import type {
  Generations,
  GenerationMedia,
  OutputMedia,
} from "~/types/generations";

export default () => {
  const fetchGenerations = async (
    limit: number,
    offset: number,
  ): Promise<Generations[]> => {
    try {
      const generations = await $fetch<Generations[]>(
        "/api/generations/fetch",
        {
          query: { limit, offset },
        },
      );

      return generations;
    } catch (error) {
      console.error("Error fetching generations:", error);
      return [];
    }
  };

  const fetchGenerationsCount = async (type: string): Promise<number> => {
    try {
      const count = await $fetch("/api/generations/count", {
        query: { type },
      });
      return parseInt(count);
    } catch (error) {
      console.error("Error fetching generations count:", error);
      return 0;
    }
  };

  const fetchGenerationsById = async (
    id: string,
  ): Promise<{
    generations: Generations;
    generationsMedias: GenerationMedia[];
    output: OutputMedia;
  } | null> => {
    try {
      return await $fetch<{
        generations: Generations;
        generationsMedias: GenerationMedia[];
        output: OutputMedia;
      }>(`/api/generations/${id}`);
    } catch (error) {
      console.error(`Error fetching generations with id ${id}:`, error);
      return null;
    }
  };

  return {
    fetchGenerations,
    fetchGenerationsCount,
    fetchGenerationsById,
  };
};
