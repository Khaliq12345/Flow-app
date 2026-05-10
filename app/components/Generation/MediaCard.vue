<template>
  <UPageCard
    :title="template.name"
    :description="template.description"
    reverse
    :ui="{
      root: 'hover:shadow-md hover:shadow-primary transition-shadow duration-300',
      footer: 'w-full flex items-center justify-start',
    }"
  >
    <video
      v-if="type === 'video'"
      ref="video"
      :src="mediaLink(props.template.preview)"
      :alt="props.template.name"
      class="w-full h-full rounded-md aspect-video object-contain"
      autoplay
      loop
      muted
    />
    <img
      v-else
      :src="mediaLink(props.template.preview)"
      :alt="props.template.name"
      class="w-full rounded-md max-h-64 object-contain"
    />

    <template #footer>
      <UBadge
        :label="template.price + ' XOF'"
        color="neutral"
        variant="subtle"
      />
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

// Create a reference to the video element
const videoPlayer = useTemplateRef<HTMLVideoElement>("video");

const playVideo = () => {
  videoPlayer.value?.play();
};

const pauseVideo = () => {
  videoPlayer.value?.pause();
  // Optional: Reset to the beginning
  // videoPlayer.value!.currentTime = 0
};

function useTemplate() {
  console.log("Utiliser le template", props.template.id);
  router.push(`/generation?templateId=${props.template.id}`);
}
</script>
