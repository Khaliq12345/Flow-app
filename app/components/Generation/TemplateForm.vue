<template>
  <div class="space-y-6">
    <!-- Images Grid -->
    <div
      v-if="imageInputs.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <UPageCard
        v-for="(field, index) in imageInputs"
        :key="`image-${index}`"
        :title="field.name"
        :description="field.description"
        class="group hover:border-primary-400 transition-colors"
      >
        <label
          :for="`file-image-${index}`"
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
          :id="`file-image-${index}`"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange(field.name, $event)"
        />
        <p class="text-xs text-gray-500 text-center mt-2">
          Téléchargez une image
        </p>
      </UPageCard>
    </div>

    <!-- Text Inputs Grid (Textareas) -->
    <div
      v-if="textInputs.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <UPageCard
        v-for="(field, index) in textInputs"
        :key="`text-${index}`"
        :title="field.name"
        :description="field.description"
        class="group hover:border-primary-400 transition-colors"
      >
        <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <UTextarea
            :model-value="formData[field.name]"
            :placeholder="`Entrez ${field.description.toLowerCase()}...`"
            autoresize
            variant="none"
            :ui="{
              base: 'resize-none bg-transparent text-sm outline-none p-0',
            }"
            @update:model-value="updateField(field.name, $event)"
          />
        </div>
      </UPageCard>
    </div>

    <!-- Generate Button -->

    <UButton
      label="Générer le contenu"
      icon="i-lucide-sparkles"
      color="primary"
      size="lg"
      @click="$emit('generate')"
    />
  </div>
</template>

<script setup lang="ts">
import type { TemplateInput } from "~/types/template";

const props = defineProps<{
  inputs: TemplateInput[];
}>();
const formData = ref<Record<string, string>>({});

const emit = defineEmits<{
  "update:formData": [value: Record<string, string>];
  generate: [];
}>();

const imageInputs = computed(() =>
  props.inputs.filter((f) => f.type === "image"),
);

const textInputs = computed(() =>
  props.inputs.filter((f) => f.type === "text"),
);

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

function autoExpand(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 500) + "px";
}
</script>
