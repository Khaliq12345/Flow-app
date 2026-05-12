<!-- components/PageHeader.vue -->
<template>
  <HeaderDesktop
    class="hidden lg:block"
    :title="title"
    :description="description"
  />
  <HeaderMobile class="lg:hidden" :title="title" :description="description" />
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>
