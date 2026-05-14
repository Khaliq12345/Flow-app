<template>
  <UPageSection
    headline="Modèles:"
    :title="template.name"
    :description="template.description"
    orientation="horizontal"
    :ui="{
      root: 'w-full',
      container: 'py-3 lg:p-3 w-full',
      headline: 'uppercase',
    }"
  >
    <template #links>
      <UBadge
        :label="template.price + ' XOF'"
        color="primary"
        class="font-bold"
      />
    </template>
    <!-- Droite : média -->
    <div class="w-full md:w-96 h-56 overflow-hidden rounded-lg">
      <video
        v-if="type === 'video'"
        :src="mediaLink(template.preview)"
        :alt="template.name"
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
      />
      <img
        v-else
        :src="mediaLink(template.preview)"
        :alt="template.name"
        class="w-full h-full object-contain"
      />
    </div>
  </UPageSection>
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
