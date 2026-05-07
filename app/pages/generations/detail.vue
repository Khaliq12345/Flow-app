<template>
  <!-- Root -->
  <div class="rootdiv">
    <!-- Header -->
    <Header
      title="Détails de la génération"
      description="Voici les détails de votre génération"
    />
    <!-- Content -->
    <div class="space-y-4">
      <!-- Template link -->
      <p
        class="flex items-center gap-2 text-primary text-sm cursor-pointer"
        @click="navigateTo(`/templates/${generation.template_id}`)"
      >
        <UIcon name="i-lucide-info" class="size-5" />
        <span class="hover:underline underline-offset-2 decoration-primary">
          Clickez ici pour voir le modèle utilisé.
        </span>
      </p>
      <!-- Generation name -->
      <h1 class="text-xl sm:text-4xl font-bold">{{ generation.name }}</h1>
      <!-- Generation state -->
      <UBadge
        :label="
          generation.status === 'pending'
            ? 'En attente'
            : generation.status === 'completed'
              ? 'Terminé'
              : 'Échoué'
        "
        :color="
          generation.status === 'pending'
            ? 'warning'
            : generation.status === 'completed'
              ? 'success'
              : 'error'
        "
        variant="subtle"
        class="capitalize"
      />
      <!-- Input media -->
      <GenerationsInputMedia :input-medias="inputMedias" />
      <!-- Output media -->
      <GenerationsOutputMedia v-if="outputMedia" :output-media="outputMedia" />
      <div v-else class="space-y-2">
        <h2 class="text-lg sm:text-2xl font-semibold">Médias générés</h2>
        <div
          class="w-full h-96 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center"
        >
          <p class="text-gray-500 dark:text-gray-400">
            Aucun média généré pour le moment
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Generations } from "~/types/generations";

interface InputMedia {
  id: string;
  name: string;
  description: string;
  is_video: boolean;
}

interface OutputMedia {
  id: string;
  name: string;
  is_video: boolean;
}

const generationId = useState("generationId");

// Fallback si l'état est vide (accès direct ou refresh)
if (!generationId.value) {
  await navigateTo("/generations");
}
console.log("ID de génération reçu :", generationId.value);

// Données de test
const generation: Generations = {
  id: "gen-1",
  name: "Cyber City Sunset",
  user_id: "user-1",
  template_id: "template-1",
  input_media: "input-1",
  status: "completed",
  outputs_media: "output-1",
};

const inputMedias: InputMedia[] = [
  {
    id: "input-1",
    name: "Photo de référence",
    description: "Photo urbaine pour inspiration",
    is_video: false,
  },
  {
    id: "input-2",
    name: "Palette de couleurs",
    description: "Palette néon cyberpunk",
    is_video: false,
  },
  {
    id: "input-3",
    name: "Vidéo de style",
    description: "Style de mouvement désiré",
    is_video: true,
  },
];

const outputMedia: OutputMedia = {
  id: "output-1",
  name: "Cyber City Sunset - Final",
  is_video: true,
};
</script>

<style></style>
