<template>
    <div class="relative min-h-screen w-full">
        <!-- Vidéo plein écran en arrière-plan -->
        <video
            :src="videoSrc"
            autoplay
            muted
            loop
            class="absolute inset-0 w-full h-full object-cover"
        />

        <!-- Overlay sombre pour lisibilité -->
        <div class="absolute inset-0 bg-black/40" />

        <!-- Contenu par-dessus -->
        <div
            class="relative min-h-screen flex items-center justify-center md:justify-end p-6 md:p-12 lg:p-20"
        >
            <!-- Formulaire flottant -->
            <div
                class="w-full max-w-sm rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-2xl p-8"
            >
                <h1 class="text-white text-center text-4xl font-semibold mb-4">
                    Flow
                </h1>
                <UAuthForm
                    :schema="schema"
                    :fields="fields"
                    title="Connexion"
                    description="Entrez vos identifiants pour accéder à votre compte."
                    :submit-button="{
                        label: 'Se connecter',
                        color: 'white',
                        variant: 'outline',
                        class: 'bg-white/10 border-white/30 text-white hover:bg-white/20 w-full cursor-pointer',
                    }"
                    :ui="{
                        title: 'text-white text-xl font-semibold',
                        description: 'text-white/60 text-sm',
                    }"
                    :loading="pending"
                    @submit="onSubmit"
                >
                    <template #footer>
                        <div class="flex flex-col gap-2 w-full">
                            <p class="text-center text-sm text-white/50">
                                Mot de passe oublié ?
                                <UButton
                                    variant="link"
                                    color="neutral"
                                    size="sm"
                                    class="text-white/80 hover:text-white"
                                >
                                    Réinitialiser
                                </UButton>
                            </p>
                            <UButton
                                block
                                variant="outline"
                                to="/signup"
                                class="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                            >
                                Créer un compte
                            </UButton>
                        </div>
                    </template>
                </UAuthForm>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
});
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

// Liste des vidéos disponibles
const videos = ["https://www.pexels.com/fr-fr/download/video/32053942/"];
const fields = [
    {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "votre@email.com",
        ui: {
            base: "text-error",
        },
    },
    {
        name: "password",
        type: "password",
        label: "Mot de passe",
        placeholder: "••••••••",
        ui: {
            base: "text-error",
        },
    },
];
const schema = z.object({
    email: z.email("Email invalide"),
    password: z.string("Mot de passe invalide").min(6, "Minimum 6 caractères"),
});

// Vidéo sélectionnée aléatoirement au montage du composant
const videoSrc = ref(videos[Math.floor(Math.random() * videos.length)]);

type Schema = z.output<typeof schema>;

const { signin } = useAuth();
const toast = useToast();
const pending = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
    pending.value = true;
    try {
        await signin(event.data.email, event.data.password);
        toast.add({
            title: "Connexion success",
            description: "Vous etes connecter",
            color: "success",
        });
    } catch (error: any) {
        toast.add({
            id: "sigin_error",
            title: "Erreur de connexion",
            description:
                error.data?.message ||
                "Une erreur est survenue lors de la connexion.",
            icon: "i-heroicons-exclamation-circle",
            color: "error",
        });
    } finally {
        pending.value = false;
    }
}
</script>
