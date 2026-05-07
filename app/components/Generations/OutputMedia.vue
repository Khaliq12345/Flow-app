<template>
  <div class="space-y-2">
    <h2 class="text-lg sm:text-2xl font-semibold">Média généré</h2>
    <div class="w-full">
      <video
        v-if="outputMedia.is_video"
        src="https://www.pexels.com/fr-fr/download/video/17685644/"
        class="w-full rounded-md aspect-video object-contain bg-black"
        autoplay
        loop
        muted
      />
      <img
        v-else
        :src="mediaLink(outputMedia.id)"
        :alt="outputMedia.name"
        class="w-full rounded-md max-h-96 object-contain"
      />
    </div>
  </div>
  <UButton label="Télécharger" />
</template>

<script lang="ts" setup>
interface OutputMedia {
  id: string;
  name: string;
  is_video: boolean;
}

interface Props {
  outputMedia: OutputMedia;
}

withDefaults(defineProps<Props>(), {});
</script>

<style></style>
