<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden"
  >
    <div class="flex justify-around items-center h-16">
      <template v-for="item in mainNavItems" :key="item?.name">
        <NuxtLink
          :to="item?.to"
          class="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          :class="{
            'text-primary dark:text-primary':
              item?.to &&
              ($route.path === item.to ||
                $route.path.startsWith(item.to + '/')),
          }"
        >
          <UIcon :name="item?.icon" class="size-5 mb-1" />
          <span class="text-xs">{{ item?.label }}</span>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
