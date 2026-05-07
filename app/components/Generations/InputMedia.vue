<template>
  <div class="space-y-4">
    <h2 class="text-lg sm:text-2xl font-semibold">Médias envoyés</h2>

    <!-- Images -->
    <div v-if="images.length" class="space-y-2">
      <h3 class="text-sm text-muted">Images</h3>
      <div class="flex gap-4 overflow-x-auto pb-2">
        <div v-for="media in images" :key="media.id" class="w-56 shrink-0">
          <UPageCard
            :title="media.name"
            :description="media.description"
            orientation="vertical"
            reverse
            class="h-full"
          >
            <img
              src="https://images.pexels.com/photos/13862168/pexels-photo-13862168.jpeg"
              :alt="media.name"
              class="w-full h-40 rounded-md object-cover"
            />
          </UPageCard>
        </div>
      </div>
    </div>

    <!-- Vidéos -->
    <div v-if="videos.length" class="space-y-2">
      <h3 class="text-sm text-muted">Vidéos</h3>
      <div class="flex gap-4 overflow-x-auto pb-2">
        <div v-for="media in videos" :key="media.id" class="w-56 shrink-0">
          <UPageCard
            :title="media.name"
            :description="media.description"
            orientation="vertical"
            reverse
          >
            <div class="h-32 overflow-hidden rounded-md">
              <video
                src="https://www.pexels.com/fr-fr/download/video/37356927/"
                class="block h-full w-full object-cover"
                controls
              />
            </div>
          </UPageCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface InputMedia {
  id: string;
  name: string;
  description: string;
  is_video: boolean;
}

interface Props {
  inputMedias: InputMedia[];
}

const props = withDefaults(defineProps<Props>(), {});

const images = computed(() => props.inputMedias.filter((m) => !m.is_video));
const videos = computed(() => props.inputMedias.filter((m) => m.is_video));
</script>
