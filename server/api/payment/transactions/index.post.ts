import { Transaction } from "fedapay";
import { useFedapay } from "~~/server/utils/fedapay.ts";

export default defineEventHandler(async (event) => {
  try {
    useFedapay();
    const { transaction, fedapayId } = await readBody(event);

    const fedapayTransaction = await Transaction.create({
      description: transaction.description,
      amount: Math.round(transaction.amount),
      currency: { iso: transaction.currency ?? "XOF" },
      callback_url: transaction.callback_url,
      customer: { id: fedapayId },
      custom_metadata: transaction.custom_metadata || {},
    });

    return fedapayTransaction.id;
  } catch (err: any) {
    // Laisser passer les erreurs H3 (createError) telles quelles
    if (err.statusCode) throw err;

    console.error(
      "[payment/transactions/index.post] Erreur inattendue:",
      err?.message ?? err,
    );
    throw createError({
      statusCode: 500,
      message: `[payment/transactions/index.post] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
