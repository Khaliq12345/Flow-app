import { Transaction } from "fedapay";
import { useFedapay } from "~~/server/utils/fedapay.ts";

export default defineEventHandler(async (event) => {
  try {
    useFedapay();
    const { id } = await readBody(event);

    const transaction = await Transaction.retrieve(id);
    if (!transaction) {
      throw createError({
        statusCode: 502,
        message: "[payment/transactions/token.post] FedaPay n'a pas retourné de lien de paiement valide.",
      });
    }

    const token = await transaction.generateToken();
    console.log("[payment/transactions/token.post] Token généré, URL:", token?.url);
    if (!token?.url) {
      throw createError({
        statusCode: 502,
        message: "[payment/transactions/token.post] FedaPay n'a pas retourné de lien de paiement valide.",
      });
    }
    return token.url;
  } catch (err: any) {
    // Laisser passer les erreurs H3 (createError) telles quelles
    if (err.statusCode) throw err;

    console.error("[payment/transactions/token.post] Erreur inattendue:", err?.message ?? err);
    throw createError({
      statusCode: 500,
      message: `[payment/transactions/token.post] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
