import { Customer, Transaction } from "fedapay";
import { useFedapay } from "~~/server/utils/fedapay.ts";

export default defineEventHandler(async (event) => {
  try {
    useFedapay();
    const user = await readBody(event);

    const custumer = await Customer.create({
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email,
      phone_number: {
        number: user.phone,
        country: user.phone_country,
      },
    });

    console.log("[payment/customers/index.post] Customer FedaPay créé avec ID:", custumer.id);

    return custumer.id as number;
  } catch (err: any) {
    // Laisser passer les erreurs H3 (createError) telles quelles
    if (err.statusCode) throw err;

    console.error("[payment/customers/index.post] Erreur inattendue:", err?.message ?? err);
    throw createError({
      statusCode: 500,
      message: `[payment/customers/index.post] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
