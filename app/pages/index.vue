<template>
  <div class="px-2">
    <UPageHeader
      :title="title"
      description="Prêt à créer quelque chose d'incroyable aujourd'hui ?"
      :ui="{ root: 'relative py-2 border-none' }"
    />
  </div>
</template>

<script lang="ts" setup>
const title = gretting() + ", User";
</script>

<style></style>
