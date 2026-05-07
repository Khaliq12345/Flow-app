<template>
  <UPageCard
    :title="props.generation.name"
    orientation="vertical"
    reverse
    :ui="{
      footer: 'w-full',
    }"
  >
    <video
      v-if="props.generation.outputs_media"
      ref="video"
      :src="mediaLink(props.generation.outputs_media)"
      :alt="props.generation.name"
      class="w-full h-full rounded-md aspect-video object-contain"
      @mouseenter="playVideo"
      @mouseleave="pauseVideo"
      @click="playVideo"
      loop
      muted
    />
    <img
      v-else
      :src="mediaLink(props.generation.input_media)"
      :alt="props.generation.name"
      class="w-full rounded-md max-h-64 object-contain"
    />
    <template #footer>
      <UBadge
        :label="
          props.generation.status === 'pending'
            ? 'En attente'
            : props.generation.status === 'completed'
              ? 'Terminé'
              : 'Échoué'
        "
        :color="
          props.generation.status === 'pending'
            ? 'warning'
            : props.generation.status === 'completed'
              ? 'success'
              : 'error'
        "
      />
    </template>
  </UPageCard>
</template>

<script lang="ts" setup>
import type { Generations } from "~/types/generations";
const props = defineProps<{
  generation: Generations;
}>();

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
</script>

<style></style>
