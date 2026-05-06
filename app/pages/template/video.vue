<template>
  <!-- root -->
  <div class="rootdiv">
    <!-- Header -->
    <Header
      title="Modèles de vidéos"
      description="Choisissez un modèle de vidéo choisi et designé avec soin pour satisfaire vos besoins"
    />
    <Loading
      v-if="loading"
      class="flex items-center justify-center my-auto min-h-40"
    />
    <!-- if loading end -->
    <div v-if="!loading && templates.length > 0" class="space-y-4">
      <!-- Type Selector -->
      <TemplateTypeSelector
        :items="typeList"
        :default="typeList[0] || ''"
        @select="(item: string) => console.log(item)"
      />
      <!-- Grid Container -->
      <div class="templategrid">
        <TemplateMediaCard
          v-for="template in templates"
          :key="template.id"
          :template="template"
          type="video"
        />
      </div>
      <!-- Pagination -->
      <Pagination
        v-model:current="page"
        :total="total"
        :per-page="limit"
        @update:current="getTemplate"
      />
    </div>
    <div v-else-if="!loading" class="flex items-center justify-center md:pt-20">
      <UEmpty
        icon="i-lucide-video-off"
        title="Aucun résultat"
        description="Il semble qu'il n'y ait aucun modèle de vidéo disponible pour le moment. Veuillez réessayer plus tard."
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Template } from "~/types/template";
const { fetchTemplates, fetchTemplatesCount } = useTemplates();

const templates = ref<Template[]>([]);

const loading = ref(true);

const page = ref(1);
const total = ref(10);
const limit = 6;

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

async function getTemplate(newPage: number = 1) {
  loading.value = true;
  page.value = newPage;
  templates.value = await fetchTemplates(
    "video",
    limit,
    (page.value - 1) * limit,
  );
  total.value = await fetchTemplatesCount("video");
  loading.value = false;
}

onMounted(getTemplate);
</script>

<style></style>
