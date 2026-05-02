<template>
  <UPageCard
    :title="title"
    :description="description.slice(0, 100) + '...'"
    reverse
    :ui="{
      description: 'text-truncate',
      footer:
        'w-full px-2 flex items-center justify-center border-t border-gray-200 dark:border-gray-800 mt-2',
    }"
  >
    <img
      src="https://placehold.co/400x225"
      alt="Modèle Image"
      class="w-full rounded-md"
    />

    <template #footer>
      <UButton label="Utiliser" @click="useTemplate" />
    </template>
  </UPageCard>
</template>
<script setup lang="ts">
const title = "Image";
const description = "Un modèle d'image professionnel pour vos projets.";

const router = useRouter();

function useTemplate() {
  const templateId = getRandomTemplateId();
  console.log("Utiliser le template", templateId);
  router.push(`/generation?templateId=${templateId}`);
}
</script>
