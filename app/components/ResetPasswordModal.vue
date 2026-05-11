<template>
    <UModal v-model:open="isOpen">
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
        <template #content>
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold">
                            Mot de passe oublié
                        </h3>
                        <UButton
                            color="neutral"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            @click="isOpen = false"
                        />
                    </div>
                </template>

                <div class="space-y-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Entrez votre adresse email et nous vous enverrons un
                        lien pour réinitialiser votre mot de passe.
                    </p>

                    <UFormField label="Email" required>
                        <UInput
                            v-model="email"
                            type="email"
                            placeholder="votre@email.com"
                            icon="i-heroicons-envelope"
                            :disabled="isPending"
                            class="w-full"
                            @keyup.enter="changePassword"
                        />
                    </UFormField>
                </div>

                <template #footer>
                    <div class="flex justify-end gap-2">
                        <UButton
                            color="neutral"
                            variant="ghost"
                            :disabled="isPending"
                            @click="isOpen = false"
                        >
                            Annuler
                        </UButton>
                        <UButton
                            color="primary"
                            :loading="isPending"
                            :disabled="!email"
                            @click="changePassword"
                        >
                            Envoyer le lien
                        </UButton>
                    </div>
                </template>
            </UCard>
        </template>
    </UModal>
</template>

<script lang="ts" setup>
const { passwordRequest } = useAuth();
const toast = useToast();
const isPending = ref(false);
const email = ref<string | undefined>();
const isOpen = ref(false);

const changePassword = async () => {
    isPending.value = true;
    try {
        await passwordRequest(email.value);
        toast.add({
            title: "Email envoyé",
            description:
                "Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
            icon: "i-heroicons-check-circle",
            color: "primary",
        });
    } catch (error) {
        toast.add({
            title: "Erreur",
            description:
                "Impossible d'envoyer la demande. Veuillez réessayer plus tard.",
            icon: "i-heroicons-exclamation-circle",
            color: "error",
        });
    } finally {
        isPending.value = false;
    }
};
</script>
