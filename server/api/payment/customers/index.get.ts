import { Customer } from "fedapay";
import { useFedapay } from "~~/server/utils/fedapay";

export default defineEventHandler(async (event) => {
  try {
    useFedapay();

    const { email } = getQuery(event);

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Le paramètre 'email' est requis pour la recherche.",
      });
    }
    // 3. Perform the search via the FedaPay SDK
    const searchResults = await Customer.all({
      page: 1,
      per_page: 1,
      filters: {
        compare: {
          email: {
            op: "=",
            value: email as string,
          },
        },
        orders: {
          created_at: "desc",
        },
      },
    });

    // 4. Extract the first matching customer
    const customer = searchResults.customers[0] || null;
    if (!customer) {
      throw createError({
        statusCode: 404,
        statusMessage: `Aucun client trouvé avec l'email : ${email}`,
      });
    }

    return customer;
  } catch (err: any) {
    // Keep H3 errors as they are (400, 404)
    if (err.statusCode) throw err;

    console.error(
      "[payment/customers/index.get] Erreur lors de la recherche :",
      err?.message ?? err,
    );

    throw createError({
      statusCode: 500,
      message: `[payment/customers/index.get] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
