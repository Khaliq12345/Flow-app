<template>
  <!-- Root -->
  <div class="w-full px-8 space-y-6 pb-20 md:pb-5 overflow-y-auto">
    <!-- Header -->
    <Header
      :title="title"
      description="Prêt à créer quelque chose d'incroyable aujourd'hui ?"
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <HomeTemplateList
        title="Modèles Vidéos"
        :items="popularTemplates"
        view-more-link="/template/video"
      />
      <HomeTemplateList
        title="Modèles Images"
        :items="recentTemplates"
        view-more-link="/template/image"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TemplateListItem } from "~/types/home";

const title = gretting() + ", User";

const popularTemplates: TemplateListItem[] = [
  {
    name: "Cinematic Pro",
    description: "Vidéos haute résolution, mouvements fluides.",
    icon: "i-lucide-film",
    to: "/generation?templateId=GrzDrsoszTJaZvPhKd72CFA2",
  },
  {
    name: "Anime Motion",
    description: "Style animation japonaise dynamique.",
    icon: "i-lucide-sparkles",
    to: "/generation?templateId=Xk92LmPqR8YtUeWzA1BcDeF3",
  },
  {
    name: "3D Render",
    description: "Rendus architecturaux et produits.",
    icon: "i-lucide-box",
    to: "/generation?templateId=QwErTyUiOp1234567890ZxCv",
  },
];

const recentTemplates: TemplateListItem[] = [
  {
    name: "Portrait Pro",
    description: "Portrait professionnel et élégant.",
    icon: "i-lucide-user",
    to: "/generation?templateId=AsDfGhJkL0987654321MnBv",
  },
  {
    name: "Avatar Style",
    description: "Avatar personnalisé unique.",
    icon: "i-lucide-smile",
    to: "/generation?templateId=ZxCvBnMaSdFgHjKlQwErTy12",
  },
  {
    name: "Banner Web",
    description: "Bannière web professionnelle.",
    icon: "i-lucide-layout",
    to: "/generation?templateId=PlOkMnIjUhYgTfRdEsWaQx09",
  },
];
</script>

<style></style>
