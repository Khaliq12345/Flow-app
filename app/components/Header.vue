<!-- components/PageHeader.vue -->
<template>
  <UBanner
    v-if="isMissingUserInfo"
    color="warning"
    title="Numéro de téléphone et pays manquants, cliquez ici pour les ajouter."
    to="/settings"
    class="rounded-lg"
    :ui="{ title: 'text-wrap' }"
  />

  <HeaderDesktop
    class="hidden lg:block"
    :title="title"
    :description="description"
  />
  <HeaderMobile class="lg:hidden" :title="title" :description="description" />
</template>

<script setup lang="ts">
const isMissingUserInfo = inject("isMissingUserInfo");

defineProps<{
  title: string;
  description?: string;
}>();
</script>
