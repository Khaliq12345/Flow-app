export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.setAuthenticated();

  if (
    to.path.startsWith("/login") ||
    to.path.startsWith("/signup") ||
    to.path.startsWith("/verify") ||
    to.path.startsWith("/reset-password")
  ) {
    if (authStore.isAuthenticated) {
      return navigateTo("/");
    }
    return;
  }

  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  }

  return;
});
