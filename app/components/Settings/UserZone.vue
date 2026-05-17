<template>
    <div
        class="bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
    >
        <!-- Header avec fond dégradé -->
        <div class="relative flex items-center gap-4 px-6 py-5 bg-primary">
            <!-- Motif de points -->
            <div
                class="absolute inset-0 opacity-40"
                :style="{
                    backgroundImage:
                        'radial-gradient(circle, #a78bfa44 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }"
            />
            <UserInitials />
            <div class="relative">
                <h2 class="text-lg font-bold text-secondary">
                    {{ `${userInfo.firstName} ${userInfo.lastName}` }}
                </h2>
                <p class="text-sm text-secondary font-medium">
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
                    class="w-full"
                />
            </UFormField>
            <UFormField label="PRÉNOM">
                <UInput
                    placeholder="Prénom"
                    size="md"
                    v-model="userInfo.firstName"
                    class="w-full"
                />
            </UFormField>
            <UFormField label="ADRESSE EMAIL">
                <UInput
                    type="email"
                    placeholder="exemple@domaine.com"
                    icon="i-heroicons-envelope"
                    size="md"
                    v-model="userInfo.email"
                    class="w-full"
                />
            </UFormField>
            <UFormField label="NUMÉRO DE TÉLÉPHONE">
                <UInput
                    type="tel"
                    placeholder="22998989898"
                    icon="i-heroicons-phone"
                    size="md"
                    v-model="userInfo.phone"
                    class="w-full"
                />
            </UFormField>
            <UFormField label="PAYS" class="md:col-span-2">
                <USelect
                    v-model="selected"
                    :items="countries"
                    value-key="country_code"
                    label-key="name"
                    placeholder="Choisir un pays"
                    class="w-full"
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
    phone: user?.userFolder?.phone,
    phone_country: user?.userFolder?.phone_country,
});

const countries = [
    {
        name: "Benin",
        emoji: "🇧🇯",
        country_code: "BJ",
    },
    {
        name: "Togo",
        emoji: "🇹🇬",
        country_code: "TG",
    },
    {
        name: "Côte d'Ivoire",
        emoji: "🇨🇮",
        country_code: "CI",
    },
    {
        name: "Niger",
        emoji: "🇳🇪",
        country_code: "NE",
    },
    {
        name: "Burkina Faso",
        emoji: "🇧🇫",
        country_code: "BF",
    },
    {
        name: "Mali",
        emoji: "🇲🇱",
        country_code: "ML",
    },
    {
        name: "Senegal",
        emoji: "🇸🇳",
        country_code: "SN",
    },
];
const selected = ref(user?.userFolder?.phone_country);
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
                userFolderId: user?.userFolder?.id,
                phone: userInfo.value.phone,
                phone_country: selected.value,
            });
            toast.add({
                title: "Utilisateur mis à jour",
                color: "success",
            });
            window.location.reload();
        }
    } catch (err) {
        console.log(err);
    } finally {
        saving.value = false;
    }
};
</script>

<style></style>
