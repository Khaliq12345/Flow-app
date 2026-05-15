<template>
  <div
    class="flex items-center gap-3 bg-muted rounded-lg px-3 py-2 border border-default"
  >
    <span class="text-xs font-medium text-muted">Quota gratuit</span>

    <USeparator orientation="vertical" class="h-3.5" />

    <div class="flex items-center gap-1 text-xs text-muted">
      <UIcon name="i-lucide-image" class="size-3.5 text-info-500" />
      <span class="font-medium text-highlighted">{{ imgRemaining }}</span
      >/2
    </div>

    <div class="flex items-center gap-1 text-xs text-muted">
      <UIcon name="i-lucide-video" class="size-3.5 text-primary-500" />
      <span class="font-medium text-highlighted">{{ vidRemaining }}</span
      >/3
    </div>
  </div>
</template>
<script lang="ts" setup>
const authStore = useAuthStore();
const imgRemaining = ref(authStore.user?.userFolder?.remaining_images || 0);
const vidRemaining = ref(authStore.user?.userFolder?.remaining_videos || 0);
</script>

<style></style>
