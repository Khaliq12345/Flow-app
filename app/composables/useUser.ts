import type { User } from "~/types/user";

export const useUser = () => {
  const getUser = async (userId: string): Promise<User> => {
    try {
      const user = await $fetch<User>("/api/user", {
        method: "GET",
        params: { userId },
      });
      return user;
    } catch (err) {
      console.error("Erreur lors de la récupération de l'utilisateur :", err);
      throw err;
    }
  };

  const updateUser = async (
    userId: string,
    data: Partial<User>,
  ): Promise<User> => {
    try {
      const user = await $fetch<User>("/api/user", {
        method: "PATCH",
        params: { userId },
        body: data,
      });
      return user;
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
      throw err;
    }
  };

  return {
    getUser,
    updateUser,
  };
};
