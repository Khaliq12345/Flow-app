import { Customer } from "fedapay";
import { useFedapay } from "~~/server/utils/fedapay.ts";

export default defineEventHandler(async (event) => {
  try {
    const customerId = getRouterParam(event, "id") as string;
    const customer = await Customer.retrieve(customerId);

    return customer;
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
