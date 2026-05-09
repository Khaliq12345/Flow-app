<template>
  <div class="space-y-6">
    <!-- Project Name Input -->
    <div>
      <label
        for="projectName"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Nom du projet <span class="text-red-500">*</span>
      </label>
      <UInput
        v-model="projectName"
        color="neutral"
        variant="subtle"
        placeholder="Nom du projet"
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
      @click="startPayment"
      :loading="paymentLoading"
    />
  </div>
</template>

<script setup lang="ts">
import type { TemplateInput } from "~/types/template";
import { useAuthStore } from "~/stores/auth";

const { createGeneration, deleteGeneration } = useGenerations();
const { payAndRedirect } = usePayment();
const authStore = useAuthStore();
const paymentLoading = ref(false);
const toast = useToast();

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

const folderId = ""; // à remplacer par l'id du dossier de l'utilisateur connecté
const userId = ""; // à remplacer par l'id de l'utilisateur connecté

async function processPayment(generationId: string, templateId: string) {
  try {
    // Hydrate le store avec un utilisateur fictif
    authStore.setUser({
      id: "", // à remplacer par l'id de l'utilisateur connecté
      first_name: "", // à remplacer par le prénom de l'utilisateur connecté
      last_name: "", // à remplacer par le nom de l'utilisateur connecté
      email: "", // à remplacer par l'email de l'utilisateur connecté
      phone: "", // à remplacer par le numéro de téléphone de l'utilisateur connecté
      phone_country: "", // à remplacer par le pays de l'utilisateur connecté
    });

    // Appel avec une transaction fictive
    const result = await payAndRedirect({
      amount: 100, // à remplacer par le montant de la transaction
      description: "Paiement test abonnement", // à remplacer par la description de la transaction
      currency: "XOF", // à remplacer par la devise de la transaction
      phone_country: "BJ", // à remplacer par le pays de l'utilisateur connecté
      callback_url: "http://localhost:3000/payments/callback", // à remplacer par l'url de callback
      generationId, // à remplacer par l'id de la génération
      templateId, // à remplacer par l'id du template
      userId, // à remplacer par l'id de l'utilisateur connecté
    });

    return result;
  } catch (error) {
    console.error("[processPayment] Erreur:", error);
    toast.add({
      title: "Erreur",
      description: "Erreur lors du traitement du paiement",
      color: "error",
    });
    throw error;
  }
}

async function startPayment() {
  paymentLoading.value = true;
  let generationId: string | null = null;

  try {
    // Validate project name
    if (!projectName.value || projectName.value.trim() === "") {
      toast.add({
        title: "Erreur",
        description: "Le nom du projet est requis",
        color: "error",
      });

      return;
    }

    // Validate all image inputs are filled
    for (const field of imageInputs.value) {
      if (!fileData.value[field.name]) {
        toast.add({
          title: "Erreur",
          description: `L'image "${field.name}" est requise`,
          color: "error",
        });

        return;
      }
    }

    // Validate all text inputs are filled
    for (const field of textInputs.value) {
      if (
        !formData.value[field.name] ||
        formData.value?.[field?.name]?.trim() === ""
      ) {
        toast.add({
          title: "Erreur",
          description: `Le champ "${field.name}" est requis`,
          color: "error",
        });

        return;
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

    // Step 2: Process payment with generationId and templateId
    await processPayment(generationId, props.templateId);
  } catch (error) {
    console.error("[startPayment] Erreur:", error);

    toast.add({
      title: "Erreur",
      description:
        "Une erreur est survenue lors du traitement de votre demande.",
      color: "error",
    });

    // If generation was created but payment failed, delete it
    if (generationId) {
      const deleted = await deleteGeneration(generationId);
      if (!deleted) {
        console.error(
          "[startPayment] Échec de la suppression de la génération",
        );
      }
    }

    throw error;
  } finally {
    paymentLoading.value = false;
  }
}
</script>
