<template>
  <div
    class="w-full md:max-w-4xl md:mx-auto px-4 py-8 pb-25 md:pb-0 overflow-y-auto space-y-3"
  >
    <!-- Header -->
    <Header :title="title" :description="description" />

    <!-- Contenu -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
