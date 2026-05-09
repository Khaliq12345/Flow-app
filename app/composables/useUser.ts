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
      console.error("Error fetching user:", err);
      throw err;
    }
  };

  return {
    getUser,
  };
};
