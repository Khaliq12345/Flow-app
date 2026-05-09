import type {
  Generations,
  GenerationMedia,
  OutputMedia,
  CreateGenerationResponse,
  DeleteGenerationResponse,
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

  /**
   * Crée un fichier texte avec tous les champs texte formatés
   */
  const createTextFile = (textFields: Record<string, string>): File => {
    let content = "";
    const entries = Object.entries(textFields);

    entries.forEach(([fieldName, value], index) => {
      content += `${fieldName}:\n${value}`;
      
      // Add two newlines between entries (except for the last one)
      if (index < entries.length - 1) {
        content += "\n\n";
      }
    });

    const blob = new Blob([content], { type: "text/plain" });
    return new File([blob], "text.txt", { type: "text/plain" });
  };

  /**
   * Crée une génération en envoyant les fichiers et données au serveur
   */
  const createGeneration = async (
    templateId: string,
    folderId: string,
    userId: string,
    projectName: string,
    fileData: Record<string, File>,
    textFields: Record<string, string>,
  ): Promise<CreateGenerationResponse> => {
    try {
      const formData = new FormData();

      // Add template ID
      formData.append("templateId", templateId);

      // Add folder ID
      formData.append("folderId", folderId);

      // Add user ID
      formData.append("userId", userId);

      // Add project name
      formData.append("name", projectName);

      // Add image files with their field names
      for (const [fieldName, file] of Object.entries(fileData)) {
        const fileExtension = file.name.split(".").pop();
        const newFileName = `${fieldName}.${fileExtension}`;
        formData.append(fieldName, file, newFileName);
      }

      // Create and add text file if there are text fields
      if (Object.keys(textFields).length > 0) {
        const textFile = createTextFile(textFields);
        formData.append("textFile", textFile, "text.txt");
      }

      // Send to API
      const result = await $fetch<CreateGenerationResponse>("/api/generation/add", {
        method: "POST",
        body: formData,
      });

      return result;
    } catch (error) {
      console.error("Error creating generation:", error);
      throw error;
    }
  };

  /**
   * Supprime une génération et ses fichiers associés
   */
  const deleteGeneration = async (generationId: string): Promise<boolean> => {
    try {
      await $fetch<DeleteGenerationResponse>(`/api/generations/${generationId}`, {
        method: "DELETE",
      });
      return true;
    } catch (error) {
      console.error("Error deleting generation:", error);
      return false;
    }
  };

  return {
    fetchGenerations,
    fetchGenerationsCount,
    fetchGenerationsById,
    createGeneration,
    deleteGeneration,
  };
};
