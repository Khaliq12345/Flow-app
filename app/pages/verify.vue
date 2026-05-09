<template>
    <div
        class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
        <div class="space-y-4">
            <!-- Icône dynamique -->
            <UIcon
                :name="config.icon"
                class="w-12 h-12 mx-auto"
                :class="config.iconClass"
            />

            <!-- Titre conditionnel -->
            <h1
                v-if="config.title"
                class="text-2xl font-bold"
                :class="config.titleClass"
            >
                {{ config.title }}
            </h1>

            <!-- Message (toujours présent) -->
            <p :class="{ 'text-xl font-medium': status === 'pending' }">
                {{ message }}
            </p>

            <!-- Bouton dynamique -->
            <UButton
                v-if="config.button"
                :to="config.button.to"
                :color="config.button.color"
                :variant="config.button.variant"
            >
                {{ config.button.label }}
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
const route = useRoute();
const { verifyEmail } = useAuth();

const status = ref<"pending" | "success" | "error">("pending");
const message = ref("Vérification de votre compte en cours...");

// Configuration dynamique pour éviter les doublons dans le template
const config = computed(() => {
    const mapping = {
        pending: {
            icon: "i-heroicons-arrow-path",
            iconClass: "animate-spin text-primary",
            title: null,
            button: null,
        },
        success: {
            icon: "i-heroicons-check-circle",
            iconClass: "text-green-500",
            title: "Félicitations !",
            titleClass: "text-green-600",
            button: {
                to: "/login",
                label: "Se connecter maintenant",
                color: "success",
                variant: "ghost",
            },
        },
        error: {
            icon: "i-heroicons-x-circle",
            iconClass: "text-red-500",
            title: "Oups !",
            titleClass: "text-red-600",
            button: {
                to: "/signup",
                label: "Retour à l'inscription",
                color: "error",
                variant: "solid",
            },
        },
    };
    return mapping[status.value];
});

onMounted(async () => {
    const token = route.query.token;
    status.value = await verifyEmail(token as string);
});
</script>
