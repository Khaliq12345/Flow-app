<template>
  <div class="w-full px-4 pt-2 pb-20 md:pb-10 overflow-y-auto space-y-6">
    <!-- Header -->
    <UPageHeader
      title="Génération de contenu"
      description="Remplissez les champs requis pour générer votre contenu"
      :ui="{
        root: 'relative py-2 border-none gap-2',
      }"
    />

    <!-- Template Form -->
    <GenerationTemplateForm
      v-if="template"
      :fields="template as TemplateField[]"
    />

    <div v-if="showMissingTemplateModal" class="mx-auto md:max-w-md">
      <GenerationMissingTemplate :model-value="showMissingTemplateModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TemplateField } from "~/types/generation";

const route = useRoute();
const templateId = route.query.templateId as string;

const template = getTemplateById(templateId);
const showMissingTemplateModal = ref(!template);

</script>
