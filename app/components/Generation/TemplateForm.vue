<template>
  <div class="space-y-6">
    <!-- Project Name Input -->
    <div>
      <UFormField label="Email">
        <UInput
          v-model="projectName"
          color="neutral"
          variant="subtle"
          placeholder="Nom du projet"
        />
      </UFormField>
    </div>

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
        <UTextarea
          :model-value="formData[field.name]"
          :placeholder="`Entrez ${field.description.toLowerCase()}...`"
          variant="none"
          :maxrows="10"
          :ui="{
            root: 'p-2 rounded-lg bg-gray-50 dark:bg-gray-800 ',
            base: 'resize-none text-sm outline-none p-0 min-h-40',
          }"
          @update:model-value="updateField(field.name, $event)"
        />
      </UPageCard>
    </div>

    <!-- Generate Button -->

    <UButton
      label="Générer le contenu"
      icon="i-lucide-sparkles"
      color="primary"
      size="lg"
      @click="handleSubmit"
      :loading="paymentLoading"
    />
  </div>
</template>
<script setup lang="ts">
import type { TemplateInput } from "~/types/template";


const props = defineProps<{
  inputs: TemplateInput[];
  templateId: string;
  type: string;
  price: number;
}>();

const formData = ref<Record<string, string>>({});
const fileData = ref<Record<string, File>>({});
const projectName = ref("");

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

  fileData.value[fieldName] = file;

  const reader = new FileReader();
  reader.onload = (e) => updateField(fieldName, e.target?.result as string);
  reader.readAsDataURL(file);
}

const { paymentLoading, startPayment } = useGenerationForm({
  templateId: toRef(props, "templateId"),
  type: toRef(props, "type"),
  price: toRef(props, "price"),
  projectName,
});

function handleSubmit() {
  startPayment(
    imageInputs.value,
    textInputs.value,
    formData.value,
    fileData.value,
  );
}
</script>
