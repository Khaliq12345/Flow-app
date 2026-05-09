<template>
  <!-- Root -->
  <div class="w-full px-8 space-y-6 pb-20 md:pb-5 overflow-y-auto">
    <!-- Header -->
    <Header
      :title="title"
      description="Prêt à créer quelque chose d'incroyable ?"
    />

    <!-- Heros -->
    <div class="space-y-4 pb-10">
      <!-- Vidéo -->
      <HomeHero
        src="https://www.pexels.com/download/video/35314714/"
        type="video"
        headline="Création de vidéos"
        description="Des vidéos sur mesure qui captivent votre audience et racontent votre histoire."
      />

      <!-- Image -->
      <HomeHero
        src="https://images.pexels.com/photos/37199912/pexels-photo-37199912.jpeg"
        type="image"
        headline="Création d'images"
        description="Immortalisez chaque instant avec style."
      />
    </div>

    <!-- Template Lists Grid -->
    <Loading v-if="loading" />
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <HomeTemplateList
        title="Modèles Vidéos"
        :items="videoTemplates"
        view-more-link="/template/video"
      />
      <HomeTemplateList
        title="Modèles Images"
        :items="imageTemplates"
        view-more-link="/template/image"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Template } from "~/types/template";

const title = gretting() + ", Matthiew !";
const { fetchTemplates } = useTemplates();

const loading = ref(true);
const videoTemplates = ref<Template[]>([]);
const imageTemplates = ref<Template[]>([]);

onMounted(async () => {
  const [video, image] = await Promise.all([
    fetchTemplates("video", 3, 0),
    fetchTemplates("image", 3, 0),
  ]);
  videoTemplates.value = video;
  imageTemplates.value = image;
  loading.value = false;
});
</script>

<style></style>
