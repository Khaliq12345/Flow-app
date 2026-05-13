<template>
  <UDashboardGroup>
    <AppSidebar />
    <!-- v-if="isMissingUserInfo" -->

    <slot />
  </UDashboardGroup>
  <AppBottomNav />
</template>
<script setup lang="ts">
const authStore = useAuthStore();
const isMissingUserInfo = computed(() => {
  return (
    authStore.isAuthenticated &&
    (!authStore.user?.userFolder?.phone ||
      !authStore.user?.userFolder?.phone_country)
  );
});
provide('isMissingUserInfo', isMissingUserInfo);
</script>
