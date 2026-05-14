<template>
  <div v-if="textInputs.length > 0" class="p-2 rounded-lg space-y-4">
    <UFormField
      label="Nom du Projet"
      :ui="{
        label: 'text-gray-900 dark:text-white font-bold text-xs uppercase',
      }"
    >
      <UInput
        v-model="projectName"
        color="neutral"
        variant="outline"
        placeholder="Entrez le nom du projet"
        class="w-full hover:border-primary-400 transition-colors mb-4"
      />
    </UFormField>
    <!-- short -> UInput -->
    <div class="grid grid-cols-2 gap-4">
      <UFormField
        v-for="(field, index) in shortInputs"
        :key="`short-${index}`"
        :label="field.name"
        class="group hover:border-primary-400 transition-colors uppercase"
        :ui="{
          label: 'text-gray-900 dark:text-white font-bold text-xs',
        }"
      >
        <UInput
          v-model="formData[field.name]"
          variant="none"
          :placeholder="`Entrez ${field.description.toLowerCase()}...`"
          :ui="{
            root: 'p-2 rounded-lg bg-gray-50 dark:bg-gray-800  border border-gray-200 dark:border-gray-800',
            base: 'text-sm p-0',
          }"
          class="w-full"
        />
      </UFormField>
    </div>
    <!-- long -> UTextarea -->
    <div class="space-y-3">
      <UFormField
        v-for="(field, index) in longInputs"
        :key="`long-${index}`"
        :label="field.name"
        class="group hover:border-primary-400 transition-colors uppercase"
        :ui="{
          label: 'text-gray-900 dark:text-white font-bold text-xs',
        }"
      >
        <UTextarea
          v-model="formData[field.name]"
          variant="none"
          :placeholder="`Entrez ${field.description.toLowerCase()}...`"
          :ui="{
            root: 'p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800',
            base: 'text-sm p-0',
          }"
          class="w-full"
        />
      </UFormField>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TemplateInput } from "~/types/template";

const props = defineProps<{
  textInputs: TemplateInput[];
}>();

const shortInputs = computed(() => {
  if (!props.textInputs) return [];
  return props.textInputs.filter((input) => input && input.input === "short");
});

const longInputs = computed(() => {
  if (!props.textInputs) return [];
  return props.textInputs.filter((input) => input && input.input === "long");
});

const { projectName, formData } = inject("form") as {
  projectName: Ref<string>;
  formData: Ref<Record<string, string>>;
};
</script>
