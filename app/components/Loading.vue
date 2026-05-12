<template>
  <!-- root -->
  <div class="flex items-center justify-center my-auto min-h-40">
    <!-- wrapper -->
    <div class="flex gap-2 items-center p-2">
      <!-- Animation -->
      <img
        :src="isDark ? '/icon-white.png' : '/icon.png'"
        alt="Flow"
        class="h-12 animate-bounce"
      />
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

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");
</script>

<style></style>
