<template>
  <div class="space-y-3">
    <div class="px-4 md:px-6 flex items-center justify-between">
      <h3 class="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <UButton
        :to="viewMoreLink"
        variant="ghost"
        color="neutral"
        size="sm"
        trailing-icon="i-lucide-arrow-right"
      >
        Voir plus
      </UButton>
    </div>
    <UPageList divide>
      <UPageCard
        v-for="(item, index) in items"
        :key="index"
        variant="ghost"
        :to="item.to"
      >
        <template #body>
          <div class="w-full flex items-center gap-4">
            <!-- Icône / Thumbnail -->
            <div
              class="w-12 h-12 rounded-xl bg-gray-900 dark:bg-gray-800 flex items-center justify-center shrink-0"
            >
              <UIcon :name="item.icon" class="w-6 h-6 text-white" />
            </div>

            <!-- Texte -->
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 dark:text-white text-sm">
                {{ item.name }}
              </p>
              <p
                class="text-sm text-wrap text-gray-500 dark:text-gray-400 truncate"
              >
                {{ item.description }}
              </p>
            </div>
          </div>
        </template>
      </UPageCard>
    </UPageList>
  </div>
</template>
<script setup lang="ts">
import type { HomeTemplateListProps } from "~/types/home";

const props = defineProps<HomeTemplateListProps>();
</script>
