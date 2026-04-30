<template>
  <UTabs
    :items="items"
    :default-value="current"
    size="sm"
    :content="false"
    @update:model-value="current = $event as string"
  />
</template>

<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const current = inject("current") as Ref<string>;

const items: TabsItem[] = [
  {
    label: "Images",
    value: "images",
  },
  {
    label: "Vidéos",
    value: "vidéos",
  },
];
</script>
