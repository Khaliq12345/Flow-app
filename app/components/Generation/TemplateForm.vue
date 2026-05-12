<template>
  <div class="space-y-6">
    <!-- wrapper -->
    <div class="flex flex-col md:flex-row gap-4 max-h-190 overflow-auto">
      <!-- Text Inputs Grid -->
      <GenerationTextForm
        :textInputs="textInputs"
        class="md:w-1/2"
      ></GenerationTextForm>

      <!-- Image Inputs Grid (Textareas) -->

      <GenerationMediaForm
        :imageInputs="imageInputs"
        class="md:w-1/2"
      ></GenerationMediaForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TemplateInput } from "~/types/template";

const props = defineProps<{
  inputs: TemplateInput[];
}>();

const imageInputs = computed(() =>
  props.inputs.filter((f) => f.type === "image"),
);

const textInputs = computed(() =>
  props.inputs.filter((f) => f.type === "text"),
);
</script>
