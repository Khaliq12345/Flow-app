<template>
  <div class="space-y-6">
    <!-- Project Name Input -->
    <div>
      <label for="projectName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Nom du projet <span class="text-red-500">*</span>
      </label>
      <input
        id="projectName"
        v-model="projectName"
        type="text"
        required
        placeholder="Entrez le nom de votre projet..."
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
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
      @click="foo"
      :loading="paymentLoading"
    />
  </div>
</template>

<script setup lang="ts">
import type { TemplateInput } from "~/types/template";
import { useAuthStore } from "~/stores/auth";

const props = defineProps<{
  inputs: TemplateInput[];
  templateId: string;
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

  // Store the actual file object
  fileData.value[fieldName] = file;

  // Create preview for display
  const reader = new FileReader();
  reader.onload = (e) => updateField(fieldName, e.target?.result as string);
  reader.readAsDataURL(file);
}

function autoExpand(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 500) + "px";
}

const { createGeneration, deleteGeneration } = useGenerations();
const { payAndRedirect } = usePayment();
const authStore = useAuthStore();
const paymentLoading = ref(false);

const folderId = "475dd14c-2861-4608-a06e-fadcd807a7b6";
const userId = "4ec09aeb-a2c6-4650-94da-8393e86d1a54";

async function processPayment() {
  try {
    // Hydrate le store avec un utilisateur fictif
    authStore.setUser({
      id: "4ec09aeb-a2c6-4650-94da-8393e86d1a54",
      first_name: "James",
      last_name: "Lanha",
      email: "james@tech2work.tech",
      phone: "+22997491925",
      phone_country: "BJ",
    });

    // Appel avec une transaction fictive
    const result = await payAndRedirect({
      amount: 100,
      description: "Paiement test abonnement",
      currency: "XOF",
      phone_country: "BJ",
      callback_url: "http://localhost:3000/payments/callback",
    });

    console.log("[processPayment] Résultat:", result);
    return result;
  } catch (error) {
    console.error("[processPayment] Erreur:", error);
    throw error;
  }
}

async function foo() {
  paymentLoading.value = true;
  let generationId: string | null = null;

  try {
    // Validate project name
    if (!projectName.value || projectName.value.trim() === "") {
      throw new Error("Le nom du projet est requis");
    }

    // Validate all image inputs are filled
    for (const field of imageInputs.value) {
      if (!fileData.value[field.name]) {
        throw new Error(`L'image "${field.name}" est requise`);
      }
    }

    // Validate all text inputs are filled
    for (const field of textInputs.value) {
      if (!formData.value[field.name] || formData.value[field.name].trim() === "") {
        throw new Error(`Le champ "${field.name}" est requis`);
      }
    }

    // Separate text fields from image previews
    const textFields: Record<string, string> = {};
    for (const [fieldName, value] of Object.entries(formData.value)) {
      if (!fileData.value[fieldName]) {
        textFields[fieldName] = value;
      }
    }

    // Step 1: Create generation and upload files
    const generationResult = await createGeneration(
      props.templateId,
      folderId,
      userId,
      projectName.value.trim(),
      fileData.value,
      textFields,
    );

    generationId = generationResult.generationId;
    console.log("[foo] Génération créée:", generationId);

    // Step 2: Process payment
    await processPayment();

    console.log("[foo] Paiement réussi pour la génération:", generationId);
    return generationResult;
  } catch (error) {
    console.error("[foo] Erreur:", error);

    // If generation was created but payment failed, delete it
    if (generationId) {
      console.log("[foo] Suppression de la génération suite à l'échec du paiement:", generationId);
      const deleted = await deleteGeneration(generationId);
      if (deleted) {
        console.log("[foo] Génération supprimée avec succès");
      } else {
        console.error("[foo] Échec de la suppression de la génération");
      }
    }

    throw error;
  } finally {
    paymentLoading.value = false;
  }
}
</script>
