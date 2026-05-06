<template>
  <!-- root -->
  <div class="rootdiv">
    <!-- Header -->
    <Header
      title="Modèles d'images"
      description="Choisissez un modèle d'image choisi et designé avec soin pour satisfaire vos besoins"
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
          type="image"
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
    <div
      v-else-if="!loading"
      class="flex items-center justify-center md:pt-20"
    >
      <UEmpty
        icon="i-lucide-image-off"
        title="Aucun résultat"
        description="Il semble qu'il n'y ait aucun modèle d'image disponible pour le moment. Veuillez réessayer plus tard."
      />
    </div>
    <!-- Pagination -->
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

async function getTemplate(newPage: number = 1) {
  loading.value = true;
  page.value = newPage;
  templates.value = await fetchTemplates(
    "image",
    limit,
    (page.value - 1) * limit,
  );
  total.value = await fetchTemplatesCount("image");
  loading.value = false;
}

onMounted(getTemplate);
</script>
<style></style>
