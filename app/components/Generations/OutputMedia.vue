<template>
  <div class="space-y-2">
    <h2 class="text-lg sm:text-2xl">Média généré</h2>
    <div class="w-full">
      <video
        v-if="is_video"
        :src="mediaLink(outputMedia.id)"
        class="w-full rounded-md aspect-video object-contain bg-black"
        autoplay
        loop
        muted
      />
      <img
        v-else
        :src="mediaLink(outputMedia.id)"
        alt="Image de sortie"
        class="w-full rounded-md max-h-96 object-contain"
      />
    </div>
  </div>
  <UButton label="Télécharger" :loading="downloading" @click="download" />
</template>

<script lang="ts" setup>
import type { OutputMedia } from "~/types/generations";

interface Props {
  outputMedia: OutputMedia;
}

const props = defineProps<Props>();
const is_video = props.outputMedia.type.startsWith("video");

const downloading = ref(false);

async function download() {
  downloading.value = true;
  try {
    // Fetch the file as a blob to force download instead of navigation
    const response = await fetch(mediaLink(props.outputMedia.id));
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const extension = props.outputMedia.type.split("/")[1];

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `output.${extension}`;
    anchor.click();

    // Cleanup the object URL after download is triggered
    URL.revokeObjectURL(url);
  } finally {
    downloading.value = false;
  }
}
</script>