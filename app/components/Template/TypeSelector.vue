<template>
    <div class="flex flex-wrap gap-2">
        <button
            v-for="item in items"
            :key="item"
            class="px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200"
            :class="
                selected === item
                    ? 'bg-primary border-primary text-secondary'
                    : 'bg-primary text-secondary hover:border-primary hover:text-primary hover:bg-transparent'
            "
            @click="handleSelect(item)"
        >
            {{ item }}
        </button>
    </div>
</template>

<script lang="ts" setup>
import type { BadgeListProps, BadgeListEmits } from "~/types/badge-list";

const props = defineProps<BadgeListProps>();
const emit = defineEmits<BadgeListEmits>();

const selected = ref<string | null>(null);

function handleSelect(item: string) {
    selected.value = item;
    emit("select", item);
}

onMounted(() => {
    selected.value = props?.default || null;
});
</script>
