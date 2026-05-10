import type { TemplateInput } from "~/types/template";
import { useAuthStore } from "~/stores/auth";

interface GenerationFormOptions {
  templateId: Ref<string>;
  type: Ref<string>;
  price: Ref<number>;
  projectName: Ref<string>;
}

export function useGenerationForm({
  templateId,
  type,
  price,
  projectName,
}: GenerationFormOptions) {
  const { createGeneration, deleteGeneration } = useGenerations();
  const { payAndRedirect } = usePayment();
  const authStore = useAuthStore();
  const toast = useToast();
  const config = useRuntimeConfig();
  const paymentLoading = ref(false);
  const skipPayment = ref(false);

  async function processPayment(generationId: string) {
    try {
      return await payAndRedirect({
        amount: price.value,
        description: `FLOW - Paiement Projet ${projectName.value}`,
        currency: "XOF",
        callback_url: `${config.public.url}/payments/callback`,
        generationId,
        templateId: templateId.value,
      });
    } catch (error) {
      console.error("[processPayment] Erreur:", error);
      toast.add({
        title: "Erreur",
        description: "Erreur lors du traitement du paiement",
        color: "error",
      });
      throw error;
    }
  }

  async function startPayment(
    imageInputs: TemplateInput[],
    textInputs: TemplateInput[],
    formData: Record<string, string>,
    fileData: Record<string, File>,
  ) {
    paymentLoading.value = true;
    let generationId: string | null = null;

    try {
      if (!projectName.value.trim()) {
        toast.add({
          title: "Erreur",
          description: "Le nom du projet est requis",
          color: "error",
        });
        return;
      }

      for (const field of imageInputs) {
        if (!fileData[field.name]) {
          toast.add({
            title: "Erreur",
            description: `L'image "${field.name}" est requise`,
            color: "error",
          });
          return;
        }
      }

      for (const field of textInputs) {
        if (!formData[field.name]?.trim()) {
          toast.add({
            title: "Erreur",
            description: `Le champ "${field.name}" est requis`,
            color: "error",
          });
          return;
        }
      }

      const textFields: Record<string, string> = {};
      for (const [fieldName, value] of Object.entries(formData)) {
        if (!fileData[fieldName]) {
          textFields[fieldName] = value;
        }
      }

      const folder = authStore.user?.userFolder;
      if (type.value === "video" && (folder?.remaining_videos || 0) > 0)
        skipPayment.value = true;
      if (type.value === "image" && (folder?.remaining_images || 0) > 0)
        skipPayment.value = true;

      const generationResult = await createGeneration(
        templateId.value,
        authStore.user?.userFolder?.folder_id || "",
        authStore.user?.id || "",
        projectName.value.trim(),
        fileData,
        textFields,
        skipPayment.value,
      );

      generationId = generationResult.generationId;

      if (!skipPayment.value) {
        await processPayment(generationId);
      }

      if (generationId) {
        toast.add({
          title: "Génération créée",
          description: "Votre génération a été créée avec succès",
          color: "success",
        });
        const generationIdState = useState("generationId");
        generationIdState.value = generationId;
        await navigateTo("/generations/detail");
      }
    } catch (error) {
      console.error("[startPayment] Erreur:", error);
      toast.add({
        title: "Erreur",
        description:
          "Une erreur est survenue lors du traitement de votre demande.",
        color: "error",
      });

      if (generationId) {
        const deleted = await deleteGeneration(generationId);
        if (!deleted)
          console.error(
            "[startPayment] Échec de la suppression de la génération",
          );
      }

      throw error;
    } finally {
      paymentLoading.value = false;
    }
  }

  return { paymentLoading, startPayment };
}
