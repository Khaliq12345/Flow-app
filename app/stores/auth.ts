import { readMe, refresh } from "@directus/sdk";
import { defineStore } from "pinia";
import { useDirectusUser } from "~~/server/utils/directus";

export const useAuthStore = defineStore(
  "userStore",
  () => {
    const token = ref<string | null>(null);
    const user = ref({});
    const isAuthenticated = ref<boolean>(false);
    const location = reactive({});

    const setUser = (person: any) => {
      user.value = person;
      return true;
    };

    const updateUser = (obj: object) => {
      Object.assign(user.value, obj);
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
        const user = await client.request(readMe());
        console.log("USER ", user);
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
      const access = useCookie("access_token");
      const refresh = useCookie("refresh_token");
      access.value = null;
      refresh.value = null;
      isAuthenticated.value = false;
      user.value = {};
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
      updateUser,
      getToken,
    };
  },
  {
    persist: true,
  },
);
