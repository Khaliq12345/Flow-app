<!-- components/PageHeader.vue -->
<template>
  <div
    class="w-full flex items-center justify-between gap-4 flex-wrap py-4 border-b-2 border-gray-500"
  >
    <div class="space-y-2">
      <h1
        class="text-xl sm:text-4xl font-medium text-gray-900 dark:text-white leading-tight"
      >
        {{ title }}
      </h1>
      <p v-if="description" class="text-sm text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
      <UButton
        label="Retour"
        variant="outline"
        color="neutral"
        icon="i-lucide-arrow-left"
        @click="$router.back()"
      />
    </div>

    <div v-if="$slots.actions" class="flex items-center gap-2 shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>
