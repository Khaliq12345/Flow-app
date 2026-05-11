<template>
    <!-- Root -->
    <div class="rootdiv space-y-3">
        <!-- Header -->
        <Header
            title="Détails de la génération"
            description="Voici les détails de votre génération"
        />

        <!-- Pay Button -->
        <UButton
            v-if="paymentUrl"
            :to="paymentUrl"
            target="_blank"
            color="neutral"
            variant="solid"
            size="md"
            class="mb-4"
        >
            Payer
        </UButton>

        <!-- Loading State -->
        <div v-if="loading" class="space-y-4">
            <div class="flex items-center gap-2">
                <USkeleton class="h-5 w-5 rounded-full" />
                <USkeleton class="h-4 w-56" />
            </div>
            <USkeleton class="h-10 w-48" />
            <USkeleton class="h-6 w-24 rounded-full" />
            <USkeleton class="h-48 w-full rounded-xl" />
        </div>

        <!-- Content -->
        <div v-else class="space-y-4">
            <!-- Template link -->
            <div
                class="flex items-center gap-2 text-primary text-sm cursor-pointer w-fit rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 hover:bg-primary/10 transition-colors"
                @click="
                    navigateTo(
                        `/generation?templateId=${generations?.template_id}`,
                    )
                "
            >
                <UIcon name="i-lucide-info" class="size-5 shrink-0" />
                <span
                    class="hover:underline underline-offset-2 decoration-primary"
                >
                    Cliquez ici pour voir le modèle utilisé.
                </span>
            </div>

            <!-- Generation name -->
            <h1 class="text-xl sm:text-4xl font-bold text-highlighted">
                {{ generations?.name }}
            </h1>

            <!-- Generation status badge -->
            <UBadge
                :label="statusLabel"
                :color="statusColor"
                variant="subtle"
                class="capitalize"
            />

            <!-- Input media -->
            <div class="space-y-8">
                <h2 class="text-lg font-semibold text-highlighted">
                    Médias envoyés
                </h2>
                <GenerationsInputMedia :input-medias="generationsMedias" />
            </div>

            <!-- Output media -->
            <GenerationsOutputMedia
                v-if="outputMedia"
                :output-media="outputMedia"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type {
    Generations,
    GenerationMedia,
    OutputMedia,
} from "~/types/generations";
import type { FedapayTransaction } from "~/types/payment";

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

const statusLabel = computed(() => {
    if (generations.value?.status === "pending") return "En Attente";
    if (generations.value?.status === "completed") return "Terminé";
    return "Échoué";
});

const statusColor = computed(() => {
    if (generations.value?.status === "pending") return "warning";
    if (generations.value?.status === "completed") return "success";
    return "error";
});

async function getGeneration() {
    loading.value = true;
    const output = await fetchGenerationsById(generationId.value as string);
    console.log(output);
    generations.value = output?.generations || null;
    generationsMedias.value = output?.generationsMedias || [];
    outputMedia.value = output?.output || null;
    if (!generations.value) {
        await navigateTo("/generations");
    }
    console.log("here output is: ", outputMedia.value);
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
        console.log(transaction);
    }
});
</script>
