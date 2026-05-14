<template>
    <UPageSection
        headline="Modèle:"
        :title="template.name"
        :description="template.description"
        orientation="horizontal"
        class="border border-gray-200 rounded-lg dark:border-gray-700"
        :ui="{
            root: 'w-full',
            container: 'py-3 lg:p-3 w-full',
            headline: 'uppercase',
        }"
    >
        <template #links>
            <UBadge
                :label="template.price + ' XOF'"
                color="primary"
                class="font-bold"
            />
        </template>
        <!-- Droite : média -->
        <div
            class="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 flex"
        >
            <video
                v-if="type === 'video'"
                :src="mediaLink(template.preview)"
                :alt="template.name"
                class="w-full h-full object-contain"
                autoplay
                loop
                muted
            />
            <img
                v-else
                :src="mediaLink(template.preview)"
                :alt="template.name"
                class="w-full h-full object-contain"
            />
        </div>
    </UPageSection>
</template>

<script setup lang="ts">
import type { Template } from "~/types/template";

const props = defineProps<{
    template: Template;
    type: "image" | "video";
    hideFooter?: boolean;
}>();

const router = useRouter();
</script>
