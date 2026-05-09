<template>
    <div class="flex flex-col items-center justify-center min-h-screen px-4">
        <UCard class="w-full max-w-md">
            <template #header>
                <h1 class="text-xl font-bold text-center">
                    Nouveau mot de passe
                </h1>
            </template>

            <!-- State initialisé pour la validation réactive -->
            <UForm
                :schema="resetSchema"
                :state="state"
                class="space-y-4"
                @submit="onSubmit"
            >
                <p class="text-sm text-gray-500">
                    Choisis un nouveau mot de passe sécurisé pour ton compte.
                </p>

                <!-- Champ Mot de passe -->
                <UFormField label="Nouveau mot de passe" name="password">
                    <UInput
                        v-model="state.password"
                        name="password"
                        :type="show ? 'text' : 'password'"
                        placeholder="••••••••"
                        icon="i-heroicons-lock-closed"
                        class="w-full"
                        :ui="{ trailing: 'pe-1' }"
                    >
                        <template #trailing>
                            <UButton
                                color="neutral"
                                variant="link"
                                size="sm"
                                :icon="
                                    show ? 'i-lucide-eye-off' : 'i-lucide-eye'
                                "
                                :aria-label="
                                    show
                                        ? 'Cacher le mot de passe'
                                        : 'Afficher le mot de passe'
                                "
                                @click="show = !show"
                            />
                        </template>
                    </UInput>
                </UFormField>

                <!-- Champ Confirmation -->
                <UFormField
                    label="Confirmer le mot de passe"
                    name="confirmPassword"
                >
                    <UInput
                        v-model="state.confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        icon="i-heroicons-check-badge"
                        class="w-full"
                    />
                </UFormField>

                <UButton type="submit" block :loading="pending">
                    Mettre à jour le mot de passe
                </UButton>

                <div class="text-center">
                    <ULink
                        to="/login"
                        class="text-sm text-primary hover:underline transition-colors"
                    >
                        Retour à la connexion
                    </ULink>
                </div>
            </UForm>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { z } from "zod";
definePageMeta({ layout: false });

const { resetPassword } = useAuth();
const route = useRoute();
const toast = useToast();

const show = ref(false);
const pending = ref(false);

const state = reactive({
    password: "",
    confirmPassword: "",
});

// Schéma avec validation de correspondance
const resetSchema = z
    .object({
        password: z
            .string()
            .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    });

async function onSubmit(event: any) {
    if (pending.value) return;

    const token = route.query.token as string;

    if (!token) {
        toast.add({
            title: "Erreur",
            description:
                "Le jeton de réinitialisation est manquant ou invalide.",
            color: "error",
        });
        return;
    }

    pending.value = true;

    try {
        await resetPassword(token, event.data.password);

        toast.add({
            title: "Succès !",
            description:
                "Ton mot de passe a été mis à jour. Tu peux maintenant te connecter.",
            color: "success",
        });

        // Redirection vers le login après succès
        await navigateTo("/login");
    } catch (error: any) {
        console.error("Erreur reset password:", error);

        toast.add({
            title: "Erreur",
            description:
                error.data?.message ||
                "Une erreur est survenue lors de la réinitialisation.",
            color: "error",
            icon: "i-heroicons-exclamation-circle",
        });
    } finally {
        pending.value = false;
    }
}
</script>
