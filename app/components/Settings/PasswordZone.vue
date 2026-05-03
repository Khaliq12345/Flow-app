<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
  >
    <!-- Header -->
    <div
      class="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2"
    >
      <div class="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
        <UIcon
          name="i-heroicons-lock-closed"
          class="text-primary-500 w-4 h-4"
        />
      </div>
      <h2 class="font-semibold text-gray-800 dark:text-white text-sm">
        Sécurité
      </h2>
    </div>

    <!-- Champs -->
    <div class="p-5 flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-gray-600 dark:text-gray-400"
          >Mot de passe actuel</label
        >
        <UInput
          type="password"
          placeholder="••••••••"
          size="md"
          v-model="password.current"
        />
      </div>

      <USeparator />

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-gray-600 dark:text-gray-400"
          >Nouveau mot de passe</label
        >
        <UInput
          type="password"
          placeholder="••••••••"
          size="md"
          v-model="password.new"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-gray-600 dark:text-gray-400"
          >Confirmation</label
        >
        <UInput
          type="password"
          placeholder="••••••••"
          size="md"
          v-model="password.confirm"
        />
      </div>

      <UButton
        label="Modifier le mot de passe"
        icon="i-heroicons-key"
        block
        color="primary"
        class="mt-1"
        @click="changePassword"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const password = ref({
  current: "",
  new: "",
  confirm: "",
});

const changePassword = () => {
  console.log(password.value);
};
</script>

<style></style>
