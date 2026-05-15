<!-- components/HeaderMobile.vue -->
<template>
  <div class="space-y-3 pt-2">
    <div
      class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
    >
      <img
        :src="isDark ? '/logo-white.png' : '/logo.png'"
        alt="Flow"
        class="h-8"
      />

      <div class="flex items-center gap-2">
        <UColorModeButton />

        <UPopover mode="hover" v-model:open="open">
          <UserInitials @click="open = !open" />

          <template #content>
            <FreeQuotaMobile />
          </template>
        </UPopover>
      </div>
    </div>

    <div>
      <h1
        class="text-xl sm:text-4xl font-bold uppercase text-gray-900 dark:text-white leading-tight"
      >
        {{ title }}
      </h1>
      <p v-if="description" class="text-base text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();

const colorMode = useColorMode();
const open = ref(false);

const isDark = computed(() => colorMode.value === "dark");
</script>
