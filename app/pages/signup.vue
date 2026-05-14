<template>
  <div class="relative min-h-screen w-full">
    <video
      :src="videoSrc"
      autoplay
      muted
      loop
      class="absolute inset-0 w-full h-full object-cover"
    />

    <div class="absolute inset-0 bg-black/40" />

    <div
      class="relative min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-20"
    >
      <!-- Container élargi sur md+ pour accueillir la grille -->
      <div
        class="w-full max-w-md rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-2xl p-8"
      >
        <!-- Titre + description -->
        <div class="mb-6">
          <div class="flex justify-center">
            <img
              :src="isDark ? '/logo-white.png' : '/logo.png'"
              alt="Flow Logo"
              class="text-white text-center h-12 w-auto mb-4"
            />
          </div>
          <h2 class="text-white text-lg font-semibold">Créer un compte</h2>
          <p class="text-white/60 text-sm mt-1">
            Renseignez vos informations pour commencer.
          </p>
        </div>

        <UForm
          :schema="schema"
          :state="state"
          @submit="onSubmit"
          class="space-y-4"
        >
          <!-- Grille 2 colonnes sur md+ -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Nom" name="nom" :ui="{ label: labelClass }">
              <UInput
                v-model="state.last_name"
                placeholder="Dupont"
                class="w-full"
                :ui="{ base: inputClass }"
              />
            </UFormField>

            <UFormField
              label="Prénom"
              name="prenom"
              :ui="{ label: labelClass }"
            >
              <UInput
                v-model="state.first_name"
                placeholder="Jean"
                class="w-full"
                :ui="{ base: inputClass }"
              />
            </UFormField>

            <!-- Email : pleine largeur -->
            <UFormField
              label="Email"
              name="email"
              :ui="{ label: labelClass }"
              class="md:col-span-2"
            >
              <UInput
                v-model="state.email"
                type="email"
                placeholder="votre@email.com"
                class="w-full"
                :ui="{ base: inputClass }"
              />
            </UFormField>

            <UFormField
              label="Mot de passe"
              name="password"
              :ui="{ label: labelClass }"
            >
              <UInput
                v-model="state.password"
                type="password"
                placeholder="••••••••"
                class="w-full"
                :ui="{ base: inputClass }"
              />
            </UFormField>

            <UFormField
              label="Confirmer mot de passe"
              name="confirm"
              :ui="{ label: labelClass }"
            >
              <UInput
                v-model="state.confirm"
                type="password"
                placeholder="••••••••"
                class="w-full"
                :ui="{ base: inputClass }"
              />
            </UFormField>
          </div>

          <!-- Bouton submit -->
          <UButton
            :loading="pending"
            type="submit"
            block
            color="neutral"
            variant="outline"
            class="bg-white/10 border-white/30 text-white hover:bg-white/20 cursor-pointer mt-2"
          >
            S'inscrire
          </UButton>

          <!-- Footer -->
          <p class="text-center text-sm text-white/50 pt-1">
            Déjà un compte ?
            <UButton
              variant="link"
              color="neutral"
              size="sm"
              class="text-white/80 hover:text-white"
              to="/login"
            >
              Se connecter
            </UButton>
          </p>
        </UForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

// 1. Initialize the toast composable
const toast = useToast();

const schema = z
  .object({
    first_name: z.string().min(2, "Minimum 2 caractères"),
    last_name: z.string().min(2, "Minimum 2 caractères"),
    email: z.email("Email valide obligatoire"),
    password: z.string().min(6, "Minimum 6 caractères"),
    confirm: z.string().min(6, "Minimum 6 caractères"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  });

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({});

const inputClass =
  "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15";
const labelClass = "text-white/80 text-sm";

const videos = ["https://www.pexels.com/fr-fr/download/video/37099166/"];

const videoSrc = ref(videos[Math.floor(Math.random() * videos.length)]);

const { signup } = useAuth();

const pending = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>): Promise<void> {
  if (pending.value) return;

  pending.value = true;
  try {
    await signup(event.data);

    toast.add({
      title: "Compte créé !",
      description:
        "Veuillez vérifier votre e-mails pour valider votre compte avant de vous connecter.",
      color: "success",
    });

    await navigateTo("/login");
  } catch (error: any) {
    toast.add({
      id: "signup_error",
      title: "Erreur d'inscription",
      description:
        error.data?.message ||
        "Une erreur est survenue lors de la création de ton compte.",
      icon: "i-heroicons-exclamation-circle",
      color: "error",
    });
  } finally {
    pending.value = false;
  }
}
</script>
