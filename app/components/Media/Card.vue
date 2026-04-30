<template>
  <UPageCard
    reverse
    :title="name"
    :description="description"
    class="group cursor-pointer active:ring-2 hover:ring-2 active:ring-primary/50 hover:ring-primary/50 transition-all"
    @click="emit('click')"
  >
    <!-- Thumbnail -->
    <div class="w-full aspect-video shrink-0">
      <img
        v-if="!is_video"
        :src="url"
        :alt="name"
        class="w-full h-full object-cover rounded-l-lg md:rounded-t-lg md:rounded-l-none"
      />
      <video
        v-else
        :src="url"
        class="w-full h-full object-cover rounded-l-lg md:rounded-t-lg md:rounded-l-none"
      ></video>
    </div>

    <template #footer>
      <div class="flex items-center gap-2 mt-1">
        <UBadge
          v-if="version"
          :label="version"
          color="primary"
          variant="subtle"
          size="xs"
          class="text-[10px]"
        />
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ size || since }}
        </span>
        <UBadge
          v-if="is_video"
          :label="formatDuration(duration || 0)"
          color="neutral"
          icon="i-lucide-play"
          variant="subtle"
          size="xs"
        />
      </div>
    </template>
  </UPageCard>
</template>

<script lang="ts" setup>
interface Props {
  name: string;
  description: string; // NOUVEAU
  since: string;
  size?: string; // NOUVEAU — ex: "2.4 MB"
  is_video: boolean;
  duration?: number;
  version?: string;
  url?: string;
}

withDefaults(defineProps<Props>(), {
  url: "https://placehold.co/400x225",
});

const emit = defineEmits<{
  (e: "click"): void;
}>();

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
</script>
