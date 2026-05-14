<template>
  <!-- Images Grid -->
  <div
    v-if="imageInputs.length > 0"
    class="grid grid-cols-1 lg:grid-cols-2 gap-4"
  >
    <div
      v-for="(field, index) in imageInputs"
      :key="`image-${index}`"
      class="rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-colors p-4 flex flex-col"
    >
      <div class="mb-3">
        <h3 class="font-bold uppercase text-sm text-gray-900 dark:text-white">
          {{ field.name }}
        </h3>
        <p class="text-xs text-gray-500">{{ field.description }}</p>
      </div>

      <label
        :for="`file-image-${index}`"
        class="group flex-1 min-h-0 h-38 block rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 transition-colors overflow-hidden bg-gray-50 dark:bg-gray-800 cursor-pointer"
      >
        <img
          v-if="formData[field.name]"
          :src="formData[field.name]"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="h-full flex flex-col items-center justify-center p-8 text-center"
        >
          <UIcon
            name="i-lucide-image-plus"
            class="size-12 text-gray-400 group-hover:text-primary-400 transition-colors"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TemplateInput } from "~/types/template";

defineProps<{
  imageInputs: TemplateInput[];
}>();

const formData = defineModel<Record<string, string>>("formData");
const fileData = defineModel<Record<string, File>>("fileData");

function handleFileChange(fieldName: string, event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file || !fileData.value) return;

  fileData.value[fieldName] = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    formData.value = {
      ...formData.value,
      [fieldName]: e.target?.result as string,
    };
  };

  reader.readAsDataURL(file);
}
</script>
