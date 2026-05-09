import { readMe, refresh } from "@directus/sdk";
import { defineStore } from "pinia";
import type { User } from "~/types/user";
import { useDirectusUser } from "~~/server/utils/directus";

export const useAuthStore = defineStore(
  "userStore",
  () => {
    const token = ref<string | null>(null);
    const user = ref<User>();
    const isAuthenticated = ref<boolean>(false);
    const location = reactive({});

    const setUser = async (userId: any) => {
      const { getUser } = useUser();
      if (!userId) {
        return;
      } else {
        user.value = (await getUser(userId)) as any;
      }
    };

    const setToken = (accessToken: string | null) => {
      token.value = accessToken;
    };

    const setAuthenticated = async () => {
      if (!token.value) {
        isAuthenticated.value = false;
        return;
      }
      const client = useDirectusUser(token.value);

      try {
        const response = await client.request(readMe());
        await setUser(response.id);
        isAuthenticated.value = true;
      } catch (err) {
        console.warn("Token expired or invalid, attempting refresh...");
        try {
          // 1. Attempt to refresh the token
          const result = await client.request(refresh());
          console.log("RESULT REFRESH ", refresh);
          // 2. Update your local token storage/state
          token.value = result.access_token;
          isAuthenticated.value = true;

          console.log("Token refreshed successfully");
        } catch (refreshErr) {
          // 4. If refresh fails, the session is truly dead
          console.error("Refresh failed, redirecting to login", refreshErr);
          token.value = null;
          isAuthenticated.value = false;
        }
      }
    };

    const cleanUser = () => {
      isAuthenticated.value = false;
      user.value = undefined;
      token.value = "";
    };

    const getToken = computed(() => token.value);

    return {
      isAuthenticated,
      setUser,
      setToken,
      user,
      location,
      token,
      setAuthenticated,
      cleanUser,
      getToken,
    };
  },
  {
    persist: true,
  },
);
