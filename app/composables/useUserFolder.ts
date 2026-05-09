import type { UserFolder } from "~/types/userfolder";

export const useUserFolder = () => {
  async function fetchUserFolder(userId: string): Promise<UserFolder[] | null> {
    try {
      return await $fetch<UserFolder>("/api/user/folder/fetch", {
        method: "GET",
        query: {
          userId,
        },
      });
    } catch (error) {
      console.error(
        "[useUserFolder] Erreur lors de la récupération du dossier utilisateur:",
        error,
      );
      return null;
    }
  }

  return {
    fetchUserFolder,
  };
};
