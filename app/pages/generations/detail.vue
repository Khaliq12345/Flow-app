<template>
  <div class="rootdiv">
    <!-- Header: back arrow + title + description -->
    <Header
      title="Détails de la génération"
      description="Voici les détails de votre génération"
    ></Header>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div class="lg:col-span-2 space-y-4">
        <USkeleton class="h-10 w-64" />
        <USkeleton class="h-5 w-96" />
        <USkeleton class="h-6 w-32 mt-4" />
        <USkeleton class="h-48 w-full rounded-xl" />
      </div>
      <div class="lg:col-span-1 space-y-4">
        <USkeleton class="h-64 w-full rounded-xl" />
      </div>
    </div>

    <!-- Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <!-- Left column: title, description, medias -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Title + description -->
        <div class="space-y-2">
          <h1 class="text-3xl sm:text-4xl font-bold text-highlighted">
            {{ generations?.name }}
          </h1>
          <p class="text-base text-muted">
            Visualisation détaillée des médias et paramètres associés à ce
            projet.
          </p>
        </div>

        <!-- Input media card -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold text-highlighted uppercase">
            Médias envoyés
          </h2>
          <UCard variant="soft" :ui="{ body: 'p-4 sm:p-6' }">
            <div class="space-y-4">
              <GenerationsInputMedia :input-medias="generationsMedias" />
            </div>
          </UCard>
        </div>

        <!-- Output media -->
        <GenerationsOutputMedia
          v-if="outputMedia"
          :output-media="outputMedia"
        />
      </div>

      <!-- Right column: status card + template link -->
      <div class="lg:col-span-1 space-y-4">
        <GenerationsStatus
          v-model:generations="generations"
          :paymentUrl="paymentUrl"
        ></GenerationsStatus>
      </div>
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
const { getTransactionById, generateTransactionToken } = usePayment();

const generationId = useState("generationId");
const loading = ref(true);
const generations = ref<Generations | null>(null);
const generationsMedias = ref<GenerationMedia[]>([]);
const outputMedia = ref<OutputMedia | null>(null);
const paymentUrl = ref<string | undefined>();

// Fallback if state is empty (direct access or page refresh)
if (!generationId.value) {
  await navigateTo("/generations");
}

async function getGeneration() {
  loading.value = true;
  const output = await fetchGenerationsById(generationId.value as string);
  generations.value = output?.generations || null;
  generationsMedias.value = output?.generationsMedias || [];
  outputMedia.value = output?.output || null;
  if (!generations.value) {
    await navigateTo("/generations");
  }
  loading.value = false;
}

onMounted(async () => {
  await getGeneration();
  if (
    generations.value?.transaction_id &&
    generations.value.payment_status === "pending"
  ) {
    const transaction = await getTransactionById(
      generations.value?.transaction_id,
    );
    if (!transaction.payment_url) {
      paymentUrl.value = await generateTransactionToken(
        generations.value.transaction_id,
      );
    } else {
      paymentUrl.value = transaction.payment_url;
    }
  }
});
</script>
