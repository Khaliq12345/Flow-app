<template>
  <div>
    <UAvatar :text="initials" size="md" />
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const initials = computed(() => {
  const firstName = authStore.user?.first_name?.[0] || "";
  const lastName =
    authStore.user?.last_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("") || "";

  return firstName + lastName || "+1";
});
</script>

<style></style>
