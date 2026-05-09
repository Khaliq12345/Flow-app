// composables/usePayment.ts
import { useAuthStore } from "~/stores/auth";
import type {
  PaymentPayload,
  PaymentResult,
  UserFolder,
  CreateCustomerPayload,
  CreateTransactionPayload,
  FedapayCustomer,
  FedapayTransaction,
} from "~/types/payment";

export function usePayment() {
  const authStore = useAuthStore();
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  /**
   * Récupère une transaction
   */
  async function getTransactionById(id: number): Promise<FedapayTransaction> {
    try {
      const transaction = await $fetch<FedapayTransaction>(`/api/payment/transactions/${id}`);
      return transaction;
    } catch (err: any) {
      console.error("Error fetching transaction id:", id, "error: ", err);
      throw err;
    }
  }

  /**
   * Récupère le user_folder par email depuis Directus
   */
  async function getUserFedaId(email: string): Promise<UserFolder | null> {
    try {
      const userFolder = await $fetch<UserFolder | null>(
        "/api/payment/users/fedaid",
        {
          query: { email },
        },
      );
      return userFolder;
    } catch (err: any) {
      console.error("Error fetching user fedaid:", err);
      throw err;
    }
  }

  /**
   * Crée un customer FedaPay
   */
  async function createCustomer(user: CreateCustomerPayload): Promise<number> {
    try {
      const customerId = await $fetch<number>("/api/payment/customers", {
        method: "POST",
        body: user,
      });
      return customerId;
    } catch (err: any) {
      console.error("Error creating customer:", err);
      throw err;
    }
  }

  /**
   * Récupère un customer FedaPay par ID
   */
  async function getCustomer(customerId: string): Promise<FedapayCustomer> {
    try {
      const customer = await $fetch<FedapayCustomer>(
        `/api/payment/customers/${customerId}`,
      );
      return customer;
    } catch (err: any) {
      console.error("Error fetching customer:", err);
      throw err;
    }
  }

  /**
   * Met à jour le fedapay_id dans Directus user_folder
   */
  async function updateUserFedapayId(
    userFolderId: string,
    fedapayId: number,
  ): Promise<void> {
    try {
      await $fetch(`/api/payment/customers/${userFolderId}`, {
        method: "PUT",
        body: { fedapayId },
      });
    } catch (err: any) {
      console.error("Error updating user fedapay_id:", err);
      throw err;
    }
  }

  /**
   * Crée une transaction FedaPay
   */
  async function createTransaction(
    transaction: CreateTransactionPayload,
    fedapayId: number,
  ): Promise<number> {
    try {
      const transactionId = await $fetch<number>("/api/payment/transactions", {
        method: "POST",
        body: { transaction, fedapayId },
      });
      return transactionId;
    } catch (err: any) {
      console.error("Error creating transaction:", err);
      throw err;
    }
  }

  /**
   * Génère un token de paiement pour une transaction
   */
  async function generateTransactionToken(
    transactionId: number,
  ): Promise<string> {
    try {
      const paymentUrl = await $fetch<string>(
        "/api/payment/transactions/token",
        {
          method: "POST",
          body: { id: transactionId },
        },
      );
      return paymentUrl;
    } catch (err: any) {
      console.error("Error generating transaction token:", err);
      throw err;
    }
  }

  /**
   * Fonction globale qui orchestre le processus de paiement complet :
   * 1. Récupère le user_folder par email
   * 2. Si pas de fedapay_id : crée le customer FedaPay et met à jour Directus
   * 3. Crée la transaction FedaPay
   * 4. Génère le token de paiement
   * 5. Retourne l'URL de paiement
   */
  async function initiatePayment(
    payload: PaymentPayload,
  ): Promise<PaymentResult> {
    isLoading.value = true;
    error.value = null;

    try {
      // --- 1. Validation de l'utilisateur ---
      if (!authStore.isAuthenticated || !authStore.user) {
        throw new Error("Vous devez être connecté pour effectuer un paiement.");
      }

      const { first_name, last_name, email, phone, phone_country } =
        authStore.user;

      if (!first_name || !last_name || !email || !phone) {
        throw new Error(
          "Informations utilisateur incomplètes (prénom, nom, email, téléphone requis).",
        );
      }

      if (!payload.amount || payload.amount <= 0) {
        throw new Error("Le montant doit être supérieur à 0.");
      }

      // --- 2. Récupération du user_folder ---
      const userFolder = await getUserFedaId(email);
      let fedapayCustomerId: number;

      // --- 3. Vérification / création du customer FedaPay ---
      if (!userFolder?.fedapay_id) {
        // Créer le customer FedaPay
        fedapayCustomerId = await createCustomer({
          first_name,
          last_name,
          email,
          phone,
          phone_country: phone_country ?? payload.phone_country ?? "BJ",
        });

        // Vérification du customer en le récupérant
        if (!fedapayCustomerId) {
          throw new Error("Échec de la création du customer FedaPay.");
        }

        const customerVerification = await getCustomer(
          String(fedapayCustomerId),
        );
        if (!customerVerification || !customerVerification.id) {
          throw new Error("Impossible de vérifier le customer FedaPay créé.");
        }

        // Mettre à jour le user_folder avec le fedapay_id
        if (userFolder?.id) {
          await updateUserFedapayId(userFolder.id, fedapayCustomerId);
        }
      } else {
        fedapayCustomerId = parseInt(userFolder.fedapay_id, 10);
      }

      // --- 4. Création de la transaction ---
      const transactionId = await createTransaction(
        {
          description: payload.description,
          amount: Math.round(payload.amount),
          currency: payload.currency ?? "XOF",
          callback_url:
            payload.callback_url ??
            useRuntimeConfig().public.appUrl + "/payments/callback",
          custom_metadata: {
            generationId: payload.generationId,
            templateId: payload.templateId,
            userId: payload.userId,
          },
        },
        fedapayCustomerId,
      );

      if (!transactionId) {
        throw new Error("Échec de la création de la transaction FedaPay.");
      }

      // --- 5. Génération du token de paiement (vérifie aussi l'existence de la transaction) ---
      const paymentUrl = await generateTransactionToken(transactionId);

      return {
        paymentUrl,
        transactionId,
        token: paymentUrl,
      };
    } catch (err: any) {
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
  function redirectToPayment(paymentUrl: string): void {
    if (!paymentUrl) {
      throw new Error("URL de paiement invalide.");
    }

    window.open(paymentUrl, "_blank", "noopener,noreferrer");
  }

  /**
   * Méthode tout-en-un : initie + redirige
   */
  async function payAndRedirect(
    payload: PaymentPayload,
  ): Promise<PaymentResult> {
    const result = await initiatePayment(payload);
    redirectToPayment(result.paymentUrl);
    return result;
  }

  return {
    getTransactionById,
    initiatePayment,
    redirectToPayment,
    payAndRedirect,
    isLoading: readonly(isLoading),
    error: readonly(error),
  };
}
