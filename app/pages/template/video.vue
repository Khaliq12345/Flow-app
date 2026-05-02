<template>
  <!-- root -->
  <div class="w-full px-4 pt-2 pb-20 md:pb-0 overflow-y-auto space-y-4">
    <!-- Header -->
    <Header
      title="Modèles de vidéos"
      description="Choisissez un modèle de vidéo choisi et designé avec soin pour satisfaire vos besoins"
    />
    <!-- Type Selector -->
    <TemplateTypeSelector
      :items="typeList"
      :default="typeList[0] || ''"
      @select="(item) => console.log(item)"
    />
    <!-- Grid Container -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <TemplateVideoCard v-for="i in 19" :key="i" />
    </div>
    <!-- Pagination -->
    <Pagination v-model:current="page" :total="total" :per-page="4" />
  </div>
</template>

<script lang="ts" setup>
const page = ref(1);
const total = ref(10);

const typeList = [
  "Publicité",
  "Réseaux sociaux",
  "YouTube Shorts",
  "TikTok",
  "Reels Instagram",
  "Présentation",
  "Tutoriel",
  "Vlog",
  "Motion design",
  "Intro/Outro",
  "Slideshow",
  "Interview",
];
</script>

<style></style>
