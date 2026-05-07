<template>
  <!-- root -->
  <div class="flex items-center justify-center my-auto min-h-40">
    <!-- wrapper -->
    <div class="flex gap-2 items-center p-2">
      <!-- Spinner -->
      <p
        class="w-6 h-6 border-4 border-gray-500 border-t-primary rounded-full animate-spin"
      ></p>
      <!-- Text -->
      <p>
        <span class="text-primary"> Flow </span>
        -
        <span class="text-gray-500">
          {{ message }}
        </span>
      </p>
    </div>
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
