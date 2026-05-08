import { Transaction } from "fedapay";
import { useFedapay } from "~~/server/utils/fedapay.ts";

export default defineEventHandler(async (event) => {
  try {
    const { transaction, fedapayId } = await readBody(event);

    const fedapayTransaction = await Transaction.create({
      description: transaction.description,
      amount: Math.round(transaction.amount),
      currency: { iso: transaction.currency ?? "XOF" },
      callback_url: transaction.callback_url,
      customer: { id: fedapayId },
    });

    console.log("[payment] Transaction créée, ID:", fedapayTransaction.id);
    return fedapayTransaction.id;
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
