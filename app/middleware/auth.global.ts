export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.setAuthenticated();

  if (to.path.startsWith("/login") || to.path.startsWith("/register")) {
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
