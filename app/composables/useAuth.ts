import { createUser, readMe, login, logout } from "@directus/sdk";

export const useAuth = () => {
  const { $directus } = useNuxtApp();
  const authStore = useAuthStore();
  const loading = ref<boolean>(false);

  // SIGNUP FUNCTION
  const signup = async (formData: any) => {
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
      // 2. Log in
      await signin(formData.email, formData.password);
      // 3. Update local state
      navigateTo("/template");
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
      await navigateTo("/");
    } catch (err: any) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // LOGOUT FUNCTION
  const Userlogout = async () => {
    await $directus.request(logout());
    user.value = null;
    // Optional: Redirect to home/login
    navigateTo("/login");
  };

  return {
    loading,
    signup,
    signin,
    Userlogout,
  };
};
