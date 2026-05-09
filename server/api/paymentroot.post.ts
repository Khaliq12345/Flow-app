// server/api/payment.post.ts
import { FedaPay, Customer, Transaction } from "fedapay";
import { readItems, updateItem } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserPayload {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  phone_country: string;
}

interface TransactionPayload {
  amount: number;
  description: string;
  currency: string;
  callback_url: string;
}

interface RequestBody {
  user: UserPayload;
  transaction: TransactionPayload;
}

// ─── Validation ────────────────────────────────────────────────────────────────

function validateBody(body: RequestBody): string | null {
  const { user, transaction } = body;

  if (!user?.id) return "user.id est requis";
  if (!user?.first_name) return "user.first_name est requis";
  if (!user?.last_name) return "user.last_name est requis";
  if (!user?.email) return "user.email est requis";
  if (!user?.phone) return "user.phone est requis";
  if (!transaction?.amount || transaction.amount <= 0)
    return "transaction.amount doit être > 0";
  if (!transaction?.description) return "transaction.description est requise";

  return null;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const body = await readBody<RequestBody>(event);

    // --- 1. Validation du corps de la requête ---
    const validationError = validateBody(body);
    if (validationError) {
      throw createError({ statusCode: 400, message: validationError });
    }

    const { user, transaction } = body;
    console.log(
      "[payment] Requête reçue pour:",
      user.email,
      "| montant:",
      transaction.amount,
    );

    // --- 2. Configuration du SDK FedaPay ---
    FedaPay.setApiKey(config.fedapayToken);
    FedaPay.setEnvironment(config.fedapayMode);
    console.log("[payment] FedaPay configuré en mode:", config.fedapayMode);

    // --- 3. Instance Directus Admin ---
    const directus = useDirectusAdmin();

    // --- 4. Récupération du user_folder via l'email de l'utilisateur ---
    console.log("[payment] Recherche du user_folder pour email:", user.email);

    const folders = await directus.request(
      readItems("user_folder", {
        filter: { email: { _eq: user.email } },
        limit: 1,
        fields: ["id", "email", "fedapay_id"],
      }),
    );

    const userFolder = folders?.[0] ?? null;
    console.log("[payment] user_folder trouvé:", userFolder);

    // --- 5. Vérification / création du customer FedaPay ---
    let fedapayCustomerId: number;

    if (!userFolder?.fedapay_id) {
      console.log(
        "[payment] Aucun fedapay_id trouvé → création du customer FedaPay",
      );

      console.log("[payment] Création du customer FedaPay:", user);

      const fedapayCustomer = await Customer.create({
        firstname: user.first_name,
        lastname: user.last_name,
        email: user.email,
        phone_number: {
          number: user.phone,
          country: user.phone_country,
        },
      });

      fedapayCustomerId = fedapayCustomer.id as number;
      console.log(
        "[payment] Customer FedaPay créé avec ID:",
        fedapayCustomerId,
      );

      // Mise à jour du fedapay_id dans le user_folder existant (trouvé par email)
      if (userFolder?.id) {
        console.log(
          "[payment] Mise à jour du user_folder ID:",
          userFolder.id,
          "avec fedapay_id:",
          fedapayCustomerId,
        );

        await directus.request(
          updateItem("user_folder", userFolder.id, {
            fedapay_id: String(fedapayCustomerId),
          }),
        );

        console.log("[payment] user_folder mis à jour avec succès");
      } else {
        // Aucun user_folder trouvé pour cet email — situation anormale
        console.warn(
          "[payment] Aucun user_folder trouvé pour email:",
          user.email,
          "— fedapay_id non persisté",
        );
      }
    } else {
      fedapayCustomerId = parseInt(userFolder.fedapay_id, 10);
      console.log("[payment] fedapay_id existant récupéré:", fedapayCustomerId);
    }

    // --- 6. Création de la transaction FedaPay ---
    console.log(
      "[payment] Création de la transaction pour customer:",
      fedapayCustomerId,
    );

    const fedapayTransaction = await Transaction.create({
      description: transaction.description,
      amount: Math.round(transaction.amount),
      currency: { iso: transaction.currency ?? "XOF" },
      callback_url: transaction.callback_url,
      customer: { id: fedapayCustomerId },
    });

    console.log("[payment] Transaction créée, ID:", fedapayTransaction.id);

    // --- 7. Génération du token / lien de paiement ---
    const token = await fedapayTransaction.generateToken();
    console.log("[payment] Token généré, URL:", token?.url);

    if (!token?.url) {
      throw createError({
        statusCode: 502,
        message: "FedaPay n'a pas retourné de lien de paiement valide.",
      });
    }

    // --- 8. Retour au frontend ---
    return {
      paymentUrl: token.url as string,
      transactionId: fedapayTransaction.id as number,
      token: token.token as string,
      fedapayCustomerId,
    };
  } catch (err: any) {
    // Laisser passer les erreurs H3 (createError) telles quelles
    if (err.statusCode) throw err;

    console.error("[payment] Erreur inattendue:", err?.message ?? err);
    throw createError({
      statusCode: 500,
      message: err?.message ?? "Erreur interne du serveur.",
    });
  }
});
