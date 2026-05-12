<!-- components/PageHeader.vue -->
<template>
  <div class="w-full flex items-center justify-between gap-4 flex-wrap">
    <div class="space-y-2 p-2 mb-5">
      <div class="flex items-center gap-2">
        <UButton
          variant="ghost"
          color="neutral"
          icon="i-lucide-arrow-left"
          @click="$router.back()"
        />
        <h1
          class="text-xl sm:text-4xl font-bold uppercase text-gray-900 dark:text-white leading-tight"
        >
          {{ title }}
        </h1>
      </div>
      <p v-if="description" class="text-base text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>

      <USeparator color="primary" type="solid" class="w-full" />
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
