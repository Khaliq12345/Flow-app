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
      <div class="">
        <GenerationMediaCard :template="template" :type="template?.type" />
      </div>

      <!-- wrapper -->
      <UCard>
        <template #header>
          <p class="text-xl font-semibold">Configuration des Assets</p>
        </template>

        <template #default>
          <!-- Template Form -->
          <GenerationTemplateForm :inputs="template.inputs" />
        </template>

        <template #footer>
          <!-- footer -->
          <div
            class="flex flex-col md:flex-row gap-2 items-center md:justify-between"
          >
            <p class="flex items-center gap-2 text-green-500">
              <UIcon name="i-lucide-check" />
              Prêt à générer tout les aspects obligatoire sont configuré !
            </p>
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
      </UCard>
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

// Formulaire data
const formData = ref<Record<string, string>>({});
const fileData = ref<Record<string, File>>({});
const projectName = ref("");

// Provide pour les composants enfants
provide("form", {
  formData,
  fileData,
  projectName,
});

const authStore = useAuthStore();

const imageInputs = computed(
  () => template.value?.inputs.filter((f) => f.type === "image") || [],
);

const textInputs = computed(
  () => template.value?.inputs.filter((f) => f.type === "text") || [],
);

const { paymentLoading, startPayment } = useGenerationForm({
  templateId: toRef(() => template.value?.id || ""),
  type: toRef(() => template.value?.type || ""),
  price: toRef(() => (template.value ? parseInt(template.value.price) : 0)),
  projectName,
});

async function handleSubmit(event: MouseEvent) {
  event.preventDefault();
  await authStore.setAuthenticated();
  if (!authStore.isAuthenticated) {
    await navigateTo("/login");
  } else {
    await startPayment(
      imageInputs.value,
      textInputs.value,
      formData.value,
      fileData.value,
    );
  }
}

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

onMounted(async () => {
  await getTemplate();
});
</script>
