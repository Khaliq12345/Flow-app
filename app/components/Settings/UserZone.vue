<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
  >
    <!-- Header avec fond dégradé -->
    <div
      class="relative flex items-center gap-4 px-6 py-5"
      style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)"
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
        text="UN"
        size="2xl"
        class="relative ring-4 ring-white shadow-md"
      />
      <div class="relative">
        <h2 class="text-lg font-bold text-gray-900">Unknown User</h2>
        <p class="text-sm text-primary-500 font-medium">Profil utilisateur</p>
      </div>
    </div>

    <!-- Formulaire -->
    <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-gray-600 dark:text-gray-400"
          >Nom</label
        >
        <UInput
          placeholder="Nom de famille"
          size="md"
          v-model="user.lastName"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-gray-600 dark:text-gray-400"
          >Prénom</label
        >
        <UInput placeholder="Prénom" size="md" v-model="user.firstName" />
      </div>

      <div class="flex flex-col gap-1.5 md:col-span-2">
        <label class="text-sm font-semibold text-gray-600 dark:text-gray-400"
          >Adresse email</label
        >
        <UInput
          type="email"
          placeholder="exemple@domaine.com"
          icon="i-heroicons-envelope"
          size="md"
          v-model="user.email"
        />
      </div>

      <UButton
        label="Sauvegarder"
        icon="i-lucide-save"
        class="md:col-span-2"
        @click="saveUser"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
const user = ref({
  lastName: "Doe",
  firstName: "John",
  email: "john.doe@example.com",
});

const saveUser = () => {
  console.log(user.value);
};
</script>

<style></style>
