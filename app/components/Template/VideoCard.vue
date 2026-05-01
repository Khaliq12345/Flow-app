<template>
  <UPageCard
    title="Template Vidéo"
    description="Un modèle vidéo professionnel pour vos projets."
    reverse
    :ui="{
      footer:
        'w-full px-2 flex items-center justify-center border-t border-gray-200 dark:border-gray-800 mt-2',
    }"
  >
    <
    <img
      src="https://placehold.co/400x225/1f2937/FFFFFF?text=Vidéo"
      alt="Modèle Vidéo"
      class="w-full rounded-md"
    />

    <template #footer>
      <UButton label="Utiliser" />
    </template>
  </UPageCard>
</template>
