import { readFolders, readFiles, readItem } from "@directus/sdk";
import { useDirectusAdmin } from "~~/server/utils/directus";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  try {
    const { limit, offset } = getQuery(event);

    const generations = await useDirectusAdmin().request(
      readItem("generations", id),
    );

    if (!generations) {
      throw createError({
        statusCode: 404,
        statusMessage: "Generation not found",
      });
    }

    const inputFolder = generations.inputs_output.input_folder;
    const outputFolder = generations.inputs_output.output_folder;

    if (!inputFolder) {
      throw createError({
        statusCode: 404,
        statusMessage: "Inputs folder not found",
      });
    }

    // 3. Read files from the inputs folder with optional pagination
    const generationsMedias = await useDirectusAdmin().request(
      readFiles({
        filter: { folder: { _eq: inputFolder } },
        fields: ["id", "type"],
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      }),
    );

    // 4. If an outputs folder exists, read its files and return only id and type
    let output: { id: string; type: string } | null = null;
    if (outputFolder) {
      const outputFiles = await useDirectusAdmin().request(
        readFiles({
          filter: { folder: { _eq: outputFolder } },
          fields: ["id", "type"],
          limit: 1,
        }),
      );
      output = (outputFiles[0] as { id: string; type: string }) ?? null;
    }

    return { generations, generationsMedias, output };
  } catch (err: any) {
    if (err.statusCode) throw err;

    console.error(
      "[generation/[id].get] Erreur inattendue:",
      err?.message ?? err,
    );
    throw createError({
      statusCode: 500,
      message: `[generation/[id].get] ${err?.message ?? "Erreur interne du serveur."}`,
    });
  }
});
