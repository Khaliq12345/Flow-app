<template>
  <!-- Root -->
  <div class="rootdiv">
    <!-- Header -->
    <Header
      title="Détails de la génération"
      description="Voici les détails de votre génération"
    />
    <Loading v-if="loading" />
    <!-- Content -->
    <div v-else class="space-y-4">
      <!-- Template link -->
      <p
        class="flex items-center gap-2 text-primary text-sm cursor-pointer"
        @click="navigateTo(`/templates/${generations?.template_id}`)"
      >
        <UIcon name="i-lucide-info" class="size-5" />
        <span class="hover:underline underline-offset-2 decoration-primary">
          Clickez ici pour voir le modèle utilisé.
        </span>
      </p>
      <!-- Generation name -->
      <h1 class="text-xl sm:text-4xl font-bold">{{ generations?.name }}</h1>
      <!-- Generation state -->
      <UBadge
        :label="
          generations?.status === 'pending'
            ? 'En attente'
            : generations?.status === 'completed'
              ? 'Terminé'
              : 'Échoué'
        "
        :color="
          generations?.status === 'pending'
            ? 'warning'
            : generations?.status === 'completed'
              ? 'success'
              : 'error'
        "
        variant="subtle"
        class="capitalize"
      />
      <!-- Input media -->
      <GenerationsInputMedia :input-medias="generationsMedias" />
      <!-- Output media -->
      <GenerationsOutputMedia v-if="outputMedia" :output-media="outputMedia" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {
  Generations,
  GenerationMedia,
  OutputMedia,
} from "~/types/generations";

const { fetchGenerationsById } = useGenerations();

const generationId = useState("generationId");

// Fallback if state is empty (direct access or page refresh)
if (!generationId.value) {
  await navigateTo("/generations");
}

const loading = ref(true);

const generations = ref<Generations | null>(null);
const generationsMedias = ref<GenerationMedia[]>([]);
const outputMedia = ref<OutputMedia | null>(null);

async function getGeneration() {
  loading.value = true;

  const output = await fetchGenerationsById(generationId.value as string);

  generations.value = output?.generations || null;
  generationsMedias.value = output?.generationsMedias || [];
  outputMedia.value = output?.output || null;

  if (!generations.value) {
    await navigateTo("/generations");
  }

  console.log("here output is: ", outputMedia.value);
  loading.value = false;
}

onMounted(getGeneration);
</script>
