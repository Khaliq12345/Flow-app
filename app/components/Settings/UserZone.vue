<template>
    <div
        class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
    >
        <!-- Header avec fond dégradé -->
        <div
            class="relative flex items-center gap-4 px-6 py-5"
            style="
                background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
            "
        >
            <!-- Motif de points -->
            <div
                class="absolute inset-0 opacity-40"
                style="
                    background-image: radial-gradient(
                        circle,
                        #a78bfa44 1px,
                        transparent 1px
                    );
                    background-size: 20px 20px;
                "
            />
            <UAvatar
                :text="userLetters"
                size="2xl"
                class="relative ring-4 ring-white shadow-md"
            />
            <div class="relative">
                <h2 class="text-lg font-bold text-gray-900">
                    {{ `${userInfo.firstName} ${userInfo.lastName}` }}
                </h2>
                <p class="text-sm text-primary-500 font-medium">
                    Profil utilisateur
                </p>
            </div>
        </div>
        <!-- Formulaire -->
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <UFormField label="NOM">
                <UInput
                    placeholder="Nom de famille"
                    size="md"
                    v-model="userInfo.lastName"
                />
            </UFormField>
            <UFormField label="PRÉNOM">
                <UInput
                    placeholder="Prénom"
                    size="md"
                    v-model="userInfo.firstName"
                />
            </UFormField>
            <UFormField label="ADRESSE EMAIL" class="md:col-span-2">
                <UInput
                    type="email"
                    placeholder="exemple@domaine.com"
                    icon="i-heroicons-envelope"
                    size="md"
                    v-model="userInfo.email"
                />
            </UFormField>
            <UButton
                label="Sauvegarder"
                icon="i-lucide-save"
                class="md:col-span-2"
                @click="saveUser"
                :loading="saving"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { user, setAuthenticated, isAuthenticated } = useAuthStore();
const { updateUser } = useUser();
const toast = useToast();

const userInfo = ref({
    lastName: user?.last_name,
    firstName: user?.first_name,
    email: user?.email,
});

const userLetters = computed(() => {
    return `${userInfo.value.firstName?.slice(0, 1)} ${userInfo.value.lastName?.slice(0, 1)}`;
});

const saving = ref(false);

const saveUser = async () => {
    if (!user?.id) return;

    saving.value = true;
    try {
        await setAuthenticated();
        if (!isAuthenticated) {
            return navigateTo("/login");
        } else {
            await updateUser(user.id, {
                last_name: userInfo.value.lastName,
                first_name: userInfo.value.firstName,
                email: userInfo.value.email,
            });

            toast.add({
                title: "Utilisateur mis à jour",
                color: "success",
            });
        }
    } catch (err) {
        toast.add({
            title: "Échec de la mise à jour",
            description: "Une erreur est survenue. Veuillez réessayer.",
            color: "error",
        });
    } finally {
        saving.value = false;
    }
};
</script>

<style></style>
