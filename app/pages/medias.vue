<template>
  <!-- root -->
  <div class="w-full px-2 pt-2 pb-20 md:pb-0 overflow-y-auto space-y-2">
    <!-- header -->
    <div class="px-2 flex flex-col md:flex-row items-center justify-between">
      <UPageHeader
        :title="title"
        :description="description"
        :ui="{
          root: 'relative py-2 border-none gap-2',
          description: 'hidden md:block',
        }"
      />
      <MediaNav class="w-full md:w-48" />
    </div>
    <!-- content -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <MediaCard
        v-for="item in mediaItems"
        :key="item.name"
        v-bind="item"
        @click="openModal(item)"
      />
    </div>
    <!-- Pagination -->
    <Pagination v-model:current="page" :total="total" :per-page="4" />
    <!-- modal -->
    <MediaModal v-if="selected" v-model:open="modalOpen" v-bind="selected" />
  </div>
</template>

<script lang="ts" setup>
import type { MediaItem } from "~/types/media";

const current = ref("images");
const title = computed(() => `Mes ${current.value}`);
const description = computed(
  () => `Gérer et explorez vos créations ${current.value.toLowerCase()}`,
);

const page = ref(1);
const total = ref(10);

provide("current", current);

// dataset for test
const mediaItems = [
  {
    name: "Cyber City Pan",
    description:
      "Une vue panoramique de la ville cyberpunk avec des néons et des gratte-ciels.",
    since: "Hier",
    version: "V1.0",
    is_video: true,
    duration: 8,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    name: "Neon Street Loop",
    description:
      "Une boucle de rue néon avec des réverbérations et des panneaux publicitaires.",
    since: "Il y a 2 jours",
    version: "V2.1",
    is_video: true,
    duration: 142,
    url: "https://placeholdervideo.dev/400x225",
  },
  {
    name: "Tokyo Night Drift",
    description:
      "Une vue statique d'une rue de Tokyo avec des néons et des réverbérations.",
    since: "Il y a 3 jours",
    is_video: true,
    duration: 45,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
  {
    name: "Rainy Alley Static",
    description:
      "Une vue statique d'une rue pluvieuse avec des réverbérations et des néons.",
    since: "Il y a 5 jours",
    version: "V1.2",
    is_video: false,
    url: "https://placehold.co/800x450/1a1a2e/ffffff?text=Rainy+Alley",
  },
  {
    name: "Synthwave Sunset",
    description:
      "Une vue du coucher de soleil avec des réverbérations et des néons.",
    since: "La semaine dernière",
    is_video: true,
    duration: 360,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  },
  {
    name: "Blade Runner Mood",
    description: "Une vue d'un lieu avec un ambiance de film Blade Runner.",
    since: "Il y a 2 semaines",
    version: "V3.0",
    is_video: false,
    url: "https://placeimg.dev/800x450/4F46E5?text=Blade+Runner",
  },
  {
    name: "Midnight Drive",
    description:
      "Une vue d'une route de nuit avec des réverbérations et des néons.",
    since: "Il y a 1 mois",
    is_video: true,
    duration: 7,
    url: "https://lorem.video/720p",
  },
  {
    name: "Glitch Portrait",
    description: "Une vue d'un portrait avec un effet de glitch.",
    since: "Il y a 2 mois",
    version: "V0.9-beta",
    is_video: false,
    url: "https://placehold.co/800x450/FF5733/ffffff?text=Glitch+Portrait",
  },
] as MediaItem[];
const selected = ref<MediaItem | null>(null);
const modalOpen = ref(false);

function openModal(item: MediaItem) {
  selected.value = item;
  modalOpen.value = true;
}
</script>

<style></style>
