import { readMe, refresh } from "@directus/sdk";
import { defineStore } from "pinia";
import type { User } from "~/types/user";
import { useDirectusUser } from "~~/server/utils/directus";

export const useAuthStore = defineStore(
  "userStore",
  () => {
    const token = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);
    const user = ref<User>();
    const isAuthenticated = ref<boolean>(false);
    const location = reactive({});

    const setUser = async (userId: any) => {
      const { getUser } = useUser();
      if (!userId) return;
      user.value = (await getUser(userId)) as any;
    };

    const setToken = (accessToken: string | null, refresh: string | null) => {
      token.value = accessToken;
      refreshToken.value = refresh;
    };

    const setAuthenticated = async () => {
      if (!token.value) {
        isAuthenticated.value = false;
        return;
      }

      const client = useDirectusUser(token.value);

      try {
        // 1. Try the existing token
        const response = await client.request(readMe());
        await setUser(response.id);
        isAuthenticated.value = true;
      } catch (err) {
        console.warn("Token expired or invalid, attempting refresh...");
        try {
          // 2. Refresh using "json" mode (sends refresh_token in body, not cookie)
          const result = await client.request(refresh("json"));

          if (!result.access_token) {
            throw new Error("No access token returned from refresh");
          }

          // 3. Update the stored token and rebuild the client with the new token
          token.value = result.access_token;
          const refreshedClient = useDirectusUser(result.access_token);

          // 4. Re-fetch the user with the new valid token
          const me = await refreshedClient.request(readMe());
          await setUser(me.id);

          isAuthenticated.value = true;
          console.log("Token refreshed successfully");
        } catch (refreshErr) {
          // 5. Refresh failed — full logout
          console.error("Refresh failed, clearing session", refreshErr);
          token.value = null;
          user.value = undefined;
          isAuthenticated.value = false;
        }
      }
    };

    const cleanUser = () => {
      isAuthenticated.value = false;
      user.value = undefined;
      token.value = null; // null instead of "" for consistency with the ref type
    };

    const getToken = computed(() => token.value);

    return {
      isAuthenticated,
      setUser,
      setToken,
      user,
      location,
      token,
      refreshToken,
      setAuthenticated,
      cleanUser,
      getToken,
    };
  },
  { persist: true },
);
