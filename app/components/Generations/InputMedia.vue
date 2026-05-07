<template>
  <div class="space-y-4">
    <h2 class="text-lg sm:text-2xl font-semibold">Médias envoyés</h2>

    <!-- Images -->
    <div v-if="images.length" class="space-y-2">
      <h3 class="text-sm text-muted">Images</h3>
      <div class="flex gap-4 overflow-x-auto pb-2">
        <img
          v-for="media in images"
          :key="media.id"
          :src="mediaLink(media.id)"
          alt="Image d'entrée"
          class="w-56 h-40 shrink-0 rounded-md object-cover"
        />
      </div>
    </div>

    <!-- Vidéos -->
    <div v-if="videos.length" class="space-y-2">
      <h3 class="text-sm text-muted">Vidéos</h3>
      <div class="flex gap-4 overflow-x-auto pb-2">
        <video
          v-for="media in videos"
          :key="media.id"
          :src="mediaLink(media.id)"
          class="w-56 shrink-0 aspect-video"
          autoplay
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GenerationMedia } from "~/types/generations";

interface Props {
  inputMedias: GenerationMedia[];
}

const props = withDefaults(defineProps<Props>(), {});

const images = computed(() =>
  props.inputMedias.filter((m) => m.type.startsWith("image")),
);
const videos = computed(() =>
  props.inputMedias.filter((m) => m.type.startsWith("video")),
);
</script>
