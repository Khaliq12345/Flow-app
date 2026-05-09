import { Transaction } from "fedapay";
import { useFedapay } from "~~/server/utils/fedapay.ts";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id") as string;

    useFedapay();
    const transaction = await Transaction.retrieve(id);
    return transaction;
  } catch (err: any) {
    // Laisser passer les erreurs H3 (createError) telles quelles
    if (err.statusCode) throw err;

    console.error(
      "[payment/customers/[id].get] Erreur inattendue:",
      err?.message ?? err,
    );
    throw createError({
      statusCode: 500,
      message: `[payment/tansactions/[id].get] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
