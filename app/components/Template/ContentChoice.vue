<template>
  <UModal
    v-model:open="open"
    title="Créer un contenu"
    description="Choisissez le type de contenu à générer"
    :dismissible="false"
    :close="false"
    :ui="{
      header: 'border-none',
      body: 'border-none',
      footer: 'justify-end',
    }"
  >
    <template #body>
      <div class="grid grid-cols-2 gap-3">
        <!-- List of choices -->
        <button
          v-for="choice in choices"
          :key="choice.value"
          class="group flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer"
          :class="
            selected === choice.value
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
              : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-800'
          "
          @click="selected = choice.value"
        >
          <!-- Icon Container -->
          <div
            class="flex items-center justify-center w-14 h-14 rounded-full transition-colors duration-200"
            :class="
              selected === choice.value
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-950 group-hover:text-primary-500'
            "
          >
            <UIcon :name="choice.icon" class="size-7" />
          </div>
          <!-- Text Content -->
          <div class="text-center">
            <p
              class="text-sm font-semibold transition-colors duration-200"
              :class="
                selected === choice.value
                  ? 'text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              "
            >
              {{ choice.label }}
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {{ choice.description }}
            </p>
          </div>
        </button>
      </div>
    </template>

    <template #footer="{ close }">
      <UButton :disabled="!selected" @click="handleConfirm(close)"
        >Continuer</UButton
      >
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits<{
  confirm: [value: string];
}>();

const open = ref(props.open);
const selected = ref<string | null>(null);

const choices = [
  {
    value: "image",
    icon: "i-lucide-image",
    label: "Créer une image",
    description: "Génère une image IA",
  },
  {
    value: "video",
    icon: "i-lucide-video",
    label: "Créer une vidéo",
    description: "Génère une vidéo IA",
  },
];

function handleConfirm(close: () => void) {
  if (!selected.value) return;
  emit("confirm", selected.value);
  selected.value = null;
  close();
}
</script>
