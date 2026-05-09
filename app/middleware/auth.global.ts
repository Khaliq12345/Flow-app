export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.setAuthenticated();

  if (to.path.startsWith("/login") || to.path.startsWith("/signup")) {
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
