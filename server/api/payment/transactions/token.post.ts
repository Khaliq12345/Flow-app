import { Transaction } from "fedapay";
import { useFedapay } from "~~/server/utils/fedapay.ts";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);

    const transaction = await Transaction.retrieve(id);
    if (!transaction) {
      throw createError({
        statusCode: 502,
        message: "FedaPay n'a pas retourné de lien de paiement valide.",
      });
    }

    const token = await transaction.generateToken();
    console.log("[payment] Token généré, URL:", token?.url);
    if (!token?.url) {
      throw createError({
        statusCode: 502,
        message: "FedaPay n'a pas retourné de lien de paiement valide.",
      });
    }
    return token.url;
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
