<template>
  <UPageCard
    :title="template.name"
    :description="template.description"
    reverse
    :ui="{
      root: 'hover:shadow-md hover:shadow-primary transition-shadow duration-300',
      footer:
        'w-full px-2 flex items-center justify-center border-t border-gray-200 dark:border-gray-800 mt-2',
    }"
  >
    <video
      v-if="type === 'video'"
      :src="
        mediaLink(
          props.template.preview,
          '621fff21-60bb-433b-82f6-14e968d77b2d',
        )
      "
      :alt="props.template.name"
      class="w-full rounded-md"
      autoplay
      loop
      muted
    />
    <img
      v-else
      :src="
        mediaLink(
          props.template.preview,
          '621fff21-60bb-433b-82f6-14e968d77b2d',
        )
      "
      :alt="props.template.name"
      class="w-full rounded-md"
    />

    <template #footer>
      <UButton label="Utiliser" @click="useTemplate" />
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
import type { Template } from "~/types/template";

const props = defineProps<{
  template: Template;
  type: "image" | "video";
}>();

const router = useRouter();

function useTemplate() {
  const templateId = getRandomTemplateId();
  console.log("Utiliser le template", templateId);
  router.push(`/generation?templateId=${templateId}`);
}
</script>
