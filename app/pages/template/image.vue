<template>
  <!-- root -->
  <div class="w-full px-4 pt-2 pb-20 md:pb-0 overflow-y-auto space-y-4">
    <!-- Header -->
    <Header
      title="Modèle d'images"
      description="Choisissez un modèle d'image choisi et designé avec soin pour satisfaire vos besoins"
    />
    <!-- Type Selector -->
    <TemplateTypeSelector
      :items="typeList"
      :default="typeList[0] || ''"
      @select="(item) => console.log(item)"
    />
    <!-- Grid Container -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <TemplateImageCard v-for="i in 19" :key="i" />
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
  "Miniature YouTube",
  "Bannière web",
  "Affiche événement",
  "Carte de visite",
  "Infographie",
  "Présentation",
  "Newsletter",
  "Logo",
  "Illustration",
  "Photo produit",
];
</script>
<style></style>
