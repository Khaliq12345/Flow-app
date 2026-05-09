<template>
  <div class="w-full flex items-center justify-center">
    <Loading message="Vérification du paiement..." v-if="loading" />

    <div v-else-if="paymentFailed" class="text-center max-w-md">
      <UEmpty
        variant="naked"
        icon="i-lucide-x-circle"
        title="Échec du paiement"
        description="Votre paiement n'a pas pu être traité. Veuillez réessayer ou contacter le support."
        :actions="[
          {
            icon: 'i-lucide-home',
            label: 'Retourner à l\'accueil',
            variant: 'outline',
            color: 'warning',
            to: '/',
          },
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FedapayTransaction } from "~/types/payment";

const route = useRoute();
const { getTransactionById } = usePayment();
const { updateGenerationStatus } = useGenerations();

const toast = useToast();

const transactionId = route.query.id as string;

const transaction = ref<FedapayTransaction | null>(null);
const loading = ref(true);
const paymentFailed = ref(false);

onMounted(async () => {
  if (transactionId) {
    try {
      transaction.value = await getTransactionById(Number(transactionId));

      // Check if transaction is approved and has required metadata
      if (
        transaction.value?.status === "approved" &&
        transaction.value?.custom_metadata?.generationId &&
        transaction.value?.custom_metadata?.userId
      ) {
        const generationId = transaction.value.custom_metadata.generationId;

        const success = await updateGenerationStatus(generationId);

        if (success) {
          toast.add({
            title: "Paiement validé",
            description: "Vous serez bientôt redirigé",
            color: "success",
          });
          // Redirect to generation detail page
          const generationIdState = useState("generationId");
          generationIdState.value = generationId;
          await navigateTo("/generations/detail");
        } else {
          paymentFailed.value = true;
        }
      } else {
        paymentFailed.value = true;
      }
    } catch (error) {
      toast.add({
        title: "Échec du paiement",
        description:
          "Votre paiement n'a pas pu être traité. Veuillez réessayer ou contacter le support.",
        color: "error",
      });
      console.error(
        "[callback] Erreur lors de la récupération de la transaction:",
        error,
      );
      paymentFailed.value = true;
    } finally {
      loading.value = false;
    }
  } else {
    toast.add({
      title: "Échec du paiement",
      description:
        "Votre paiement n'a pas pu être traité. Veuillez réessayer ou contacter le support.",
      color: "error",
    });
    paymentFailed.value = true;
    loading.value = false;
  }
});
</script>
