<template>
    <div class="space-y-4">
        <!-- Fichiers texte -->
        <UPageCard
            v-if="text.length"
            title="Texte"
            :ui="{
                root: 'relative flex rounded-lg overflow-hidden',
                container: 'relative flex flex-col gap-y-4 p-4 sm:p-6 min-w-0',
                wrapper: 'flex flex-col min-w-0 w-full',
                body: 'overflow-x-auto w-full',
            }"
        >
            <template #body>
                <h3 class="text-sm text-muted mb-2">Fichiers texte</h3>
                <div class="flex flex-col gap-4">
                    <UTextarea
                        v-for="media in text"
                        :key="media.id"
                        :model-value="textContents[media.id] ?? 'Chargement...'"
                        readonly
                        :rows="10"
                        variant="ghost"
                        class="w-full text-sm"
                    />
                </div>
            </template>
        </UPageCard>

        <!-- Images -->
        <UPageCard
            v-if="images.length"
            title="Image"
            :ui="{
                root: 'relative flex rounded-lg overflow-hidden',
                container: 'relative flex flex-col gap-y-4 p-4 sm:p-6 min-w-0',
                wrapper: 'flex flex-col min-w-0 w-full',
                body: 'overflow-x-auto w-full',
            }"
        >
            <template #body>
                <h3 class="text-sm text-muted mb-2">Images</h3>
                <div class="flex gap-4 pb-2">
                    <img
                        v-for="media in images"
                        :key="media.id"
                        :src="mediaLink(media.id)"
                        alt="Image d'entrée"
                        class="w-56 h-40 shrink-0 rounded-md object-cover"
                    />
                </div>
            </template>
        </UPageCard>

        <!-- Vidéos -->
        <UPageCard
            v-if="videos.length"
            title="Vidéos"
            :ui="{
                root: 'relative flex rounded-lg overflow-hidden',
                container: 'relative flex flex-col gap-y-4 p-4 sm:p-6 min-w-0',
                wrapper: 'flex flex-col min-w-0 w-full',
                body: 'overflow-x-auto w-full',
            }"
        >
            <template #body>
                <h3 class="text-sm text-muted mb-2">Vidéos</h3>
                <div class="flex gap-4 pb-2">
                    <video
                        v-for="media in videos"
                        :key="media.id"
                        :src="mediaLink(media.id)"
                        class="w-56 shrink-0 aspect-video rounded-md"
                        autoplay
                    />
                </div>
            </template>
        </UPageCard>
    </div>
</template>
<script lang="ts" setup>
import type { GenerationMedia } from "~/types/generations";

interface Props {
    inputMedias: GenerationMedia[];
}

const props = withDefaults(defineProps<Props>(), {});

const text = computed(() =>
    props.inputMedias.filter((m) => m.type.startsWith("text")),
);

const images = computed(() =>
    props.inputMedias.filter((m) => m.type.startsWith("image")),
);
const videos = computed(() =>
    props.inputMedias.filter((m) => m.type.startsWith("video")),
);

const textContents = ref<Record<string, string>>({});

async function fetchTextContent(id: string) {
    try {
        const response = await fetch(mediaLink(id));
        textContents.value[id] = await response.text();
    } catch (error) {
        console.error("[fetchTextContent] Erreur:", error);
        textContents.value[id] = "Erreur lors du chargement du fichier.";
    }
}

onMounted(() => {
    for (const media of text.value) {
        fetchTextContent(media.id);
    }
});
</script>
