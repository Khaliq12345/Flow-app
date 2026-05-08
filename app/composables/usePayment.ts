// composables/usePayment.ts
import { useAuthStore } from "~/stores/auth";

export interface PaymentPayload {
  amount: number;
  description: string;
  currency?: string; // défaut: "XOF"
  phone_country?: string; // défaut: "BJ"
  callback_url?: string;
}

export interface PaymentResult {
  paymentUrl: string;
  transactionId: number;
  token: string;
}

export function usePayment() {
  const authStore = useAuthStore();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Lance le processus de paiement :
   * 1. Récupère l'utilisateur depuis le store Pinia
   * 2. Appelle l'API serveur /api/payment
   * 3. Retourne le lien de paiement FedaPay
   */
  async function initiatePayment(
    payload: PaymentPayload,
  ): Promise<PaymentResult> {
    isLoading.value = true;
    error.value = null;

    // --- Validation de l'utilisateur ---
    if (!authStore.isAuthenticated || !authStore.user) {
      const msg = "Vous devez être connecté pour effectuer un paiement.";
      error.value = msg;
      isLoading.value = false;
      throw new Error(msg);
    }

    const { first_name, last_name, email, phone, phone_country } =
      authStore.user;

    if (!first_name || !last_name || !email || !phone) {
      const msg =
        "Informations utilisateur incomplètes (prénom, nom, email, téléphone requis).";
      error.value = msg;
      isLoading.value = false;
      throw new Error(msg);
    }

    if (!payload.amount || payload.amount <= 0) {
      const msg = "Le montant doit être supérieur à 0.";
      error.value = msg;
      isLoading.value = false;
      throw new Error(msg);
    }

    try {
      // --- Appel à l'API Nuxt server-side ---
      const result = await $fetch<PaymentResult>("/api/payment", {
        method: "POST",
        body: {
          // Données utilisateur
          user: {
            id: authStore.user.id,
            first_name,
            last_name,
            email,
            phone,
            phone_country: phone_country ?? payload.phone_country ?? "BJ",
          },
          // Données de la transaction
          transaction: {
            amount: payload.amount,
            description: payload.description,
            currency: payload.currency ?? "XOF",
            callback_url:
              payload.callback_url ??
              useRuntimeConfig().public.appUrl + "/payment/callback",
          },
        },
      });

      return result;
    } catch (err: any) {
      // Extraction du message d'erreur Nuxt $fetch
      const message =
        err?.data?.message ??
        err?.message ??
        "Une erreur est survenue lors de l'initialisation du paiement.";

      error.value = message;
      throw new Error(message);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Redirige le navigateur vers l'URL de paiement FedaPay
   */
  function redirectToPayment(paymentUrl: string) {
    if (!paymentUrl) {
      throw new Error("URL de paiement invalide.");
    }

    window.open(paymentUrl, "_blank", "noopener,noreferrer");
  }

  /**
   * Méthode tout-en-un : initie + redirige
   */
  async function payAndRedirect(payload: PaymentPayload) {
    const result = await initiatePayment(payload);
    redirectToPayment(result.paymentUrl);
    return result;
  }

  return {
    initiatePayment,
    redirectToPayment,
    payAndRedirect,
    isLoading: readonly(isLoading),
    error: readonly(error),
  };
}
