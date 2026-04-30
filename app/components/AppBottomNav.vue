<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden"
  >
    <div class="flex justify-around items-center h-16">
      <template v-for="(item, index) in mobileNavItems" :key="item?.to">
        <NuxtLink
          v-if="!item?.isAction"
          :to="item?.to"
          class="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          :class="{ 'text-primary dark:text-primary': $route.path === item?.to }"
        >
          <UIcon :name="item?.icon" class="size-5 mb-1" />
          <span class="text-xs">{{ item?.label }}</span>
        </NuxtLink>
        <NuxtLink
          v-else
          :to="item?.to"
          class="flex flex-col items-center justify-center w-full h-full"
        >
          <div
            class="flex items-center justify-center -mt-8 w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/50"
          >
            <UIcon :name="item?.icon" class="size-6 text-white" />
          </div>
          <span class="text-xs mt-1 text-primary font-medium">{{
            item?.label
          }}</span>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
const mobileNavItems = [
  mainNavItems[0],
  mainNavItems[1],
  {
    label: "Générer",
    icon: "i-lucide-sparkles",
    to: "/generation",
    isAction: true,
  },
  mainNavItems[2],
  mainNavItems[3],
];
</script>
