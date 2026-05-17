<template>
    <div
        class="flex flex-col gap-2.5 min-w-48 bg-muted rounded-xl p-3 border border-default"
    >
        <p class="text-xs font-medium text-muted uppercase tracking-widest">
            Quota gratuit restant
        </p>

        <div class="flex flex-col gap-2">
            <!-- Dynamic Quota Progress Bars -->
            <div v-for="item in quotaItems" :key="item.label">
                <div class="flex justify-between items-center mb-1">
                    <span class="flex items-center gap-1 text-xs text-muted">
                        <UIcon :name="item.icon" class="size-3.5" />
                        {{ item.label }}
                    </span>
                    <span class="text-xs text-dimmed">
                        {{ item.value }} / {{ item.max }}
                    </span>
                </div>
                <UProgress
                    :v-model="item.value"
                    :max="item.max"
                    :color="item.color"
                    size="xs"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();

// Keep reactive references to track state correctly
const imgRemaining = ref(authStore.user?.userFolder?.remaining_images || 0);
const vidRemaining = ref(authStore.user?.userFolder?.remaining_videos || 0);

// Configuration data structure to remove template duplication
const quotaItems = computed(() => [
    {
        label: "Images",
        icon: "i-lucide-image",
        value: imgRemaining.value,
        max: 3,
        color: "info",
    },
    {
        label: "Vidéos",
        icon: "i-lucide-video",
        value: vidRemaining.value,
        max: 2,
        color: "primary",
    },
]);
</script>

<style></style>
