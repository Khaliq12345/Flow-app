<template>
  <div class="w-full px-3">
    <Header
      title="Créer un contenu"
      description="Choisissez le type de contenu à générer"
    />

    <UContainer class="py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          v-for="choice in choices"
          :key="choice.value"
          class="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
          @click="router.push(`/template/${choice.value}`)"
        >
          <div
            class="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-950 group-hover:text-primary-500 transition-colors duration-200"
          >
            <UIcon :name="choice.icon" class="size-8" />
          </div>
          <div class="text-center">
            <p class="text-base font-semibold text-gray-800 dark:text-gray-200">
              {{ choice.label }}
            </p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {{ choice.description }}
            </p>
          </div>
        </button>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();

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
</script>