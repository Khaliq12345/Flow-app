<template>
  <UPageCard
    :title="template.name"
    :description="template.description"
    reverse
    :ui="uiConfig"
  >
    <!-- Media Wrapper: ensures consistent height regardless of media type -->
    <div
      class="relative aspect-video w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900 group"
    >
      <video
        v-if="type === 'video'"
        ref="videoPlayer"
        :src="mediaLink(template.preview)"
        :poster="mediaLink(template.preview)"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loop
        muted
        playsinline
        @mouseenter="playVideo"
        @mouseleave="pauseVideo"
        @touchstart="playVideo"
      />
      <img
        v-else
        :src="mediaLink(template.preview)"
        :alt="template.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <template #footer>
      <div
        class="flex flex-col md:flex-row items-center justify-between w-full gap-2"
      >
        <UButton
          label="Utiliser"
          icon="i-heroicons-plus-circle"
          @click="useTemplate"
        />
        <UBadge size="lg" variant="subtle" class="font-bold rounded-full px-3">
          {{ template.price.toLocaleString() }} XOF
        </UBadge>
      </div>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
import type { Template } from "~/types/template";

const props = defineProps<{
  template: Template;
  type: "image" | "video";
  hideFooter?: boolean;
}>();

const router = useRouter();
const videoPlayer = useTemplateRef<HTMLVideoElement>("videoPlayer");

// Computed UI configuration for Nuxt UI
const uiConfig = computed(() => ({
  root: "hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 ring-1 ring-gray-200 dark:ring-gray-800",
  footer: props.hideFooter
    ? "hidden"
    : "px-4 py-3 w-full border-t border-gray-200 dark:border-gray-800",
  body: "p-4",
}));

const playVideo = async () => {
  try {
    await videoPlayer.value?.play();
  } catch (err) {
    // Handle cases where autoplay/play is blocked by browser policy
    console.warn("Video play failed:", err);
  }
};

const pauseVideo = () => {
  videoPlayer.value?.pause();
};

function useTemplate() {
  router.push({
    path: "/generation",
    query: { templateId: props.template.id },
  });
}
</script>
