<template>
    <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
    >
        <div class="p-5 flex items-center gap-3">
            <div
                class="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/30"
            >
                <UIcon
                    name="i-heroicons-shield-check"
                    class="text-primary-600 dark:text-primary-400 w-5 h-5"
                />
            </div>
            <div>
                <h2 class="font-bold text-gray-900 dark:text-white text-base">
                    Sécurité
                </h2>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    Gérez la protection de votre compte
                </p>
            </div>
        </div>

        <div class="px-5 pb-5">
            <UButton
                label="Modifier le mot de passe"
                icon="i-heroicons-key"
                block
                variant="soft"
                color="primary"
                :loading="isPending"
                @click="changePassword"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { passwordRequest } = useAuth();
const { setAuthenticated, isAuthenticated } = useAuthStore();
const toast = useToast();
const isPending = ref(false);

const changePassword = async () => {
    isPending.value = true;

    try {
        await setAuthenticated();
        if (!isAuthenticated) {
            return navigateTo("/login");
        } else {
            await passwordRequest();
            toast.add({
                title: "Email envoyé",
                description:
                    "Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
                icon: "i-heroicons-check-circle",
                color: "primary",
            });
        }
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
