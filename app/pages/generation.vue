<template>
  <div class="rootdiv">
    <!-- Header -->
    <Header
      title="Génération de contenu"
      description="Remplissez les champs requis pour générer votre contenu"
    />

    <Loading
      v-if="loading"
      class="flex items-center justify-center my-auto min-h-40"
    />
    <div v-if="!loading && template" class="space-y-6">
      <p class="text-xl font-semibold">Modèle choisi :</p>
      <!-- Preview -->
      <div class="flex items-center">
        <GenerationMediaCard
          :template="template"
          :type="template?.type"
          
        />
      </div>
      <p class="text-xl font-semibold">Images/Textes à fournir :</p>
      <!-- Template Form -->
      <GenerationTemplateForm
        :inputs="template.inputs"
        :template-id="template.id"
        :type="template.type"
        :price="parseInt(template.price)"
      />
    </div>

    <div v-if="showMissingTemplateModal" class="mx-auto md:max-w-md">
      <GenerationMissingTemplate :model-value="showMissingTemplateModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Template } from "~/types/template";
const { fetchTemplateById } = useTemplates();

const route = useRoute();
const templateId = route.query.templateId as string;

const loading = ref(true);
const template = ref<Template | null>(null);

const showMissingTemplateModal = ref(!template);

async function getTemplate() {
  loading.value = true;
  const result = await fetchTemplateById(templateId);

  if (result) {
    template.value = result;
    showMissingTemplateModal.value = false;
  } else {
    showMissingTemplateModal.value = true;
  }

  loading.value = false;
}

onMounted(getTemplate);
</script>
