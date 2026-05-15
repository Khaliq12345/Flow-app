<template>
  <div
    class="flex flex-col gap-2.5 min-w-48 bg-muted rounded-xl p-3 border border-default"
  >
    <p class="text-xs font-medium text-muted uppercase tracking-widest">
      Quota gratuit restant
    </p>

    <div class="flex flex-col gap-2">
      <!-- Images -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="flex items-center gap-1 text-xs text-muted">
            <UIcon name="i-lucide-image" class="size-3.5" />
            Images
          </span>
          <span class="text-xs text-dimmed">{{ imgRemaining }} / 2</span>
        </div>
        <UProgress v-model="imgRemaining" :max="2" color="info" size="xs" />
      </div>

      <!-- Vidéos -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="flex items-center gap-1 text-xs text-muted">
            <UIcon name="i-lucide-video" class="size-3.5" />
            Vidéos
          </span>
          <span class="text-xs text-dimmed">{{ vidRemaining }} / 3</span>
        </div>
        <UProgress v-model="vidRemaining" :max="3" color="primary" size="xs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const imgRemaining = ref(authStore.user?.userFolder?.remaining_images || 0);
const vidRemaining = ref(authStore.user?.userFolder?.remaining_videos || 0);
</script>

<style></style>
