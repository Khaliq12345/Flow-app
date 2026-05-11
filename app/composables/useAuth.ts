import { createUser, readMe, login, logout } from "@directus/sdk";

export const useAuth = () => {
  const { $directus } = useNuxtApp();
  const authStore = useAuthStore();
  const loading = ref<boolean>(false);
  const router = useRouter();

  // SIGNUP FUNCTION
  const signup = async (formData: any) => {
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error("Signup/Login failed:", err);
      throw err;
    }
  };

  // LOGIN FUNCTION
  const signin = async (email: string, password: string) => {
    loading.value = true;
    try {
      const loginUser = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      authStore.setToken(loginUser.access_token);
      await router.push("/");
      console.log("navigation complete");
    } catch (err: any) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // VErify user email when they register
  const verifyEmail = async (token: string) => {
    try {
      await $fetch("/api/auth/verify", {
        method: "POST",
        query: {
          token: token,
        },
      });
      return "success";
    } catch (err) {
      console.error("La vérification a échoué: ", err);
      return "error";
    }
  };

  // Reset USer password
  const resetPassword = async (token: string, password: string) => {
    try {
      const response = await $fetch("/api/auth/reset-password", {
        method: "POST",
        body: {
          token: token,
          password: password,
        },
      });
      return response;
    } catch (err) {
      console.error("La vérification a échoué: ", err);
      throw err;
    }
  };

  const passwordRequest = async (
    email: string | undefined = undefined,
  ): Promise<any> => {
    try {
      const response = await $fetch("/api/auth/request-password", {
        method: "POST",
        body: { email: email ? email : authStore.user?.email },
      });
      return response;
    } catch (err: any) {
      console.error(
        "La demande de réinitialisation a échoué :",
        err.data?.message || err.message,
      );
      throw err;
    }
  };

  return {
    loading,
    signup,
    signin,
    verifyEmail,
    resetPassword,
    passwordRequest,
  };
};
