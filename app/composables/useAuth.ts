import { createUser, readMe, login, logout } from "@directus/sdk";

export const useAuth = () => {
  const { $directus } = useNuxtApp();

  // Reactive state for the logged-in user
  const user = useState("auth_user", () => null);
  const loading = useState("auth_loading", () => false);
  const error = useState("auth_error", () => null);

  // SIGNUP FUNCTION
  const signup = async (formData: any) => {
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      // 2. Log in
      // await $directus.login(formData.email, formData.password);

      // 3. Update local state
      // user.value = await $directus.request(readMe());
      navigateTo("/dashboard");
    } catch (err) {
      console.error("Signup/Login failed:", err);
      throw err;
    }
  };

  // LOGIN FUNCTION
  const signin = async (email: string, password: string) => {
    loading.value = true;
    try {
      await $directus.request(login({ email, password }));
      // Fetch the full user object and store it in state
      user.value = await $directus.request(readMe());
    } catch (err: any) {
      error.value = "Invalid email or password";
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
    user,
    loading,
    error,
    signup,
    signin,
    Userlogout,
  };
};
