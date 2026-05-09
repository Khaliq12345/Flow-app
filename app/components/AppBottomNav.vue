<template>
    <div
        class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden"
    >
        <div class="flex justify-around items-center h-16">
            <!-- Main Navigation Items -->
            <NuxtLink
                v-for="item in regularItems"
                :key="item?.name"
                :to="item?.to"
                :class="[
                    navButtonClasses,
                    {
                        'text-primary dark:text-primary':
                            item?.to && isActive(item.to),
                    },
                ]"
            >
                <UIcon :name="item?.icon" class="size-5 mb-1" />
                <span class="text-xs">{{ item?.label }}</span>
            </NuxtLink>

            <!-- "More" Popover Button -->
            <UPopover
                v-if="popoverItems.length"
                mode="click"
                :popper="{ placement: 'top' }"
            >
                <button
                    :class="[
                        navButtonClasses,
                        { 'text-primary dark:text-primary': isPopoverActive },
                    ]"
                >
                    <UIcon
                        name="i-lucide-more-horizontal"
                        class="size-5 mb-1"
                    />
                    <span class="text-xs">Plus</span>
                </button>

                <template #content="{ close }">
                    <div class="p-2 flex flex-col gap-1 min-w-40">
                        <NuxtLink
                            v-for="item in popoverItems"
                            :key="item?.name"
                            :to="item?.to"
                            class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
                            :class="{
                                'text-primary bg-gray-100 dark:bg-gray-800':
                                    item?.to && isActive(item.to),
                            }"
                            @click="close"
                        >
                            <UIcon :name="item?.icon" class="size-5 shrink-0" />
                            <span class="text-sm">{{ item?.label }}</span>
                        </NuxtLink>
                    </div>
                </template>
            </UPopover>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

// Shared classes for the bottom bar triggers
const navButtonClasses =
    "flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors";

const regularItems = computed(() =>
    mainNavItems.filter((item) => !item?.inPopover),
);
const popoverItems = computed(() =>
    mainNavItems.filter((item) => item?.inPopover),
);

const isActive = (to: string) =>
    route.path === to || route.path.startsWith(to + "/");

// Simplified check for the Popover state
const isPopoverActive = computed(() =>
    popoverItems.value.some((i) => i?.to && isActive(i.to)),
);
</script>
