import { Customer, Transaction } from "fedapay";
import { useFedapay } from "~~/server/utils/fedapay.ts";

export default defineEventHandler(async (event) => {
  try {
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

    console.log("[payment] Customer FedaPay créé avec ID:", custumer.id);

    return custumer.id as number;
  } catch (err: any) {
    // Laisser passer les erreurs H3 (createError) telles quelles
    if (err.statusCode) throw err;

    console.error("Erreur inattendue:", err?.message ?? err);
    throw createError({
      statusCode: 500,
      message: err?.message ?? "Erreur interne du serveur.",
    });
  }
});
