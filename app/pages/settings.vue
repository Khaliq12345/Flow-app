<template>
  <div
    class="min-h-screen w-full bg-gray-50 dark:bg-gray-950 px-4 py-8 pb-25 md:pb-0 overflow-y-auto"
  >
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ title }}
        </h1>
        <p
          class="text-sm text-gray-500 dark:text-gray-400 mt-1 hidden md:block"
        >
          {{ description }}
        </p>
      </div>
      <SettingsActionsButtons />
    </div>

    <!-- Contenu -->
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <SettingsUserZone class="md:col-span-2" />
      <SettingsPasswordZone />
    </div>
  </div>
</template>

<script lang="ts" setup>
const title = "Paramètres";
const description = "Gérer les paramètres de votre compte";
</script>

<style></style>
