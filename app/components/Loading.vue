<template>
  <div class="flex gap-2 items-center p-2">
    <p
      class="w-6 h-6 border-4 border-gray-500 border-t-primary rounded-full animate-spin"
    ></p>
    <p>
      <span class="text-primary"> Flow </span>
      -
      <span class="text-gray-500">
        {{ message }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  message: {
    type: String,
    default: "Chargement...",
  },
});
</script>

<style></style>
