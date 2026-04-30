<!-- components/MediaModal.vue -->
<template>
  <UModal
    :open="open"
    @update:open="emit('update:open', $event)"
    :ui="{ content: '' }"
  >
    <template #content>
      <div class="flex flex-col">
        <!-- Media viewer -->
        <div class="relative bg-black rounded-t-lg overflow-hidden">
          <img
            v-if="!is_video"
            :src="url"
            :alt="name"
            class="w-full max-h-[60vh] object-contain"
          />
          <video
            v-else
            :src="url"
            controls
            class="w-full max-h-[60vh]"
            playsinline
          />
        </div>

        <!-- Info + download -->
        <div class="p-6 flex items-center justify-between gap-4">
          <div class="min-w-0">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-white truncate"
            >
              {{ name }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {{ since }} · {{ version || "—" }}
            </p>
          </div>

          <UButton
            label="Télécharger"
            icon="i-lucide-download"
            color="primary"
            variant="solid"
            @click="downloadFile"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { MediaItem } from "~/types/media";

interface Props extends MediaItem {
  open: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

async function downloadFile() {
  try {
    const response = await fetch(props.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = props.name.replace(/\s+/g, "_");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Échec du téléchargement:", error);
    window.open(props.url, "_blank");
  }
}
</script>
