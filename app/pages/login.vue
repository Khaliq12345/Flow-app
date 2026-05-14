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
                class="w-full max-w-sm rounded-3xl bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 ring-1 ring-black/5 shadow-2xl p-8 transition-all hover:shadow-cyan-500/10"
            >
                <div class="flex justify-center">
                    <img
                        :src="isDark ? '/logo-white.png' : '/logo.png'"
                        alt="Flow Logo"
                        class="text-white text-center h-12 w-auto mb-4"
                    />
                </div>

                <UColorModeButton />
                <UAuthForm
                    :schema="schema"
                    :fields="fields"
                    title="Connexion"
                    description="Entrez vos identifiants pour accéder à votre compte."
                    :submit="{
                        label: 'Se connecter',
                        color: 'primary',
                        variant: 'outline',
                        class: 'border-primary text-primary hover:bg-secondary/20 w-full cursor-pointer',
                    }"
                    :ui="{
                        title: 'text-primary text-xl font-semibold',
                        description: 'text-primary/60 text-sm font-bold',
                    }"
                    :loading="pending"
                    @submit="onSubmit"
                >
                    <template #footer>
                        <div class="flex flex-col gap-2 w-full">
                            <ResetPasswordModal></ResetPasswordModal>
                            <UButton
                                block
                                variant="outline"
                                to="/signup"
                                class="border-primary text-primary hover:bg-secondary/20 w-full cursor-pointer"
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
import { useColorMode } from "@vueuse/core";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

// Liste des vidéos disponibles
const videos = ["https://www.pexels.com/fr-fr/download/video/32053942/"];
const fields = [
    {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "votre@email.com",
    },
    {
        name: "password",
        type: "password",
        label: "Mot de passe",
        placeholder: "••••••••",
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
