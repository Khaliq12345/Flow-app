<!-- components/AppPagination.vue -->
<template>
  <div
    class="w-full flex flex-col md:flex-row items-center justify-between py-8 px-2 gap-4 md:gap-0"
  >
    <!-- Info texte -->
    <span class="hidden md:block text-sm text-gray-500 dark:text-gray-400">
      Affichage {{ startItem }}-{{ endItem }} sur {{ total }}
    </span>

    <!-- Pagination native Nuxt UI -->
    <UPagination
      v-model:page="page"
      :total="total"
      :items-per-page="perPage"
      :sibling-count="1"
      show-edges
      active-color="primary"
      active-variant="solid"
      color="neutral"
      variant="ghost"
      size="sm"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  current: number; // Page active (1-based)
  total: number; // Nombre total d'éléments
  perPage?: number; // Éléments par page
}

const props = withDefaults(defineProps<Props>(), {
  perPage: 4,
});

const emit = defineEmits<{
  (e: "update:current", page: number): void;
}>();

// Sync v-model interne avec la prop externe
const page = computed({
  get: () => props.current,
  set: (val) => emit("update:current", val),
});

// Calculs pour le texte d'info
const startItem = computed(() =>
  props.total === 0 ? 0 : (props.current - 1) * props.perPage + 1,
);

const endItem = computed(() =>
  Math.min(props.current * props.perPage, props.total),
);
</script>
