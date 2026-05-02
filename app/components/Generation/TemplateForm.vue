<template>
  <div class="space-y-6">
    <!-- Template Inputs Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UPageCard
        v-for="(field, index) in fields"
        :key="index"
        :title="field.description"
        :description="
          field.type === 'image'
            ? 'Téléchargez une image'
            : 'Entrez votre texte'
        "
        class="group hover:border-primary-400 transition-colors"
      >
        <!-- Image Input -->
        <template v-if="field.type === 'image'">
          <label
            :for="`file-${index}`"
            class="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 transition-colors overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
          >
            <img
              v-if="formData[field.name]"
              :src="formData[field.name]"
              class="w-full h-full object-cover"
            />
            <div v-else class="text-center p-4">
              <UIcon
                name="i-lucide-image-plus"
                class="size-12 mx-auto text-gray-400 group-hover:text-primary-400 transition-colors"
              />
              <p class="text-sm text-gray-500 mt-2">Cliquez pour ajouter</p>
            </div>
          </label>
          <input
            :id="`file-${index}`"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileChange(field.name, $event)"
          />
          <p class="text-xs text-gray-500 text-center mt-2">{{ field.name }}</p>
        </template>

        <!-- Text Input -->
        <template v-else-if="field.type === 'texte'">
          <div
            class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 h-80"
          >
            <UTextarea
              :model-value="formData[field.name]"
              :placeholder="`Entrez ${field.description.toLowerCase()}...`"
              variant="none"
              class="grow h-30"
              :ui="{
                root: 'h-full',
                base: 'resize-none bg-transparent p-0 h-full',
              }"
              @update:model-value="updateField(field.name, $event)"
            />
          </div>
          <p class="text-xs text-gray-500 text-center mt-2">{{ field.name }}</p>
        </template>
      </UPageCard>
    </div>

    <!-- Generate Button -->
    <div class="flex justify-end pt-4">
      <UButton
        label="Générer le contenu"
        icon="i-lucide-sparkles"
        color="primary"
        size="lg"
        @click="$emit('generate')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TemplateField } from "~/types/generation";

const props = defineProps<{
  fields: TemplateField[];
}>();
const formData = ref<Record<string, string>>({});

const emit = defineEmits<{
  "update:formData": [value: Record<string, string>];
  generate: [];
}>();

function updateField(fieldName: string, value: string) {
  formData.value = { ...formData.value, [fieldName]: value };
}

function handleFileChange(fieldName: string, event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => updateField(fieldName, e.target?.result as string);
  reader.readAsDataURL(file);
}


</script>
