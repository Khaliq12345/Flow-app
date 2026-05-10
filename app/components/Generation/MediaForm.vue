<template>
    <!-- Images Grid -->
    <div
        v-if="imageInputs.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
        <UPageCard
            v-for="(field, index) in imageInputs"
            :key="`image-${index}`"
            :title="field.name"
            :description="field.description"
            class="group hover:border-primary-400 transition-colors"
        >
            <label
                :for="`file-image-${index}`"
                class="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 transition-colors overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
            >
                <img
                    v-if="formData[field.name]"
                    :src="formData[field.name]"
                    class="w-full h-full object-cover"
                />
                <div v-else class="text-center p-4">
                    <UIcon
                        name="i-lucide-image-plus"
                        class="size-12 mx-auto text-gray-400 group-hover:text-primary-400 transition-colors"
                    />
                    <p class="text-sm text-gray-500 mt-2">
                        Cliquez pour ajouter
                    </p>
                </div>
            </label>
            <input
                :id="`file-image-${index}`"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileChange(field.name, $event)"
            />
            <p class="text-xs text-gray-500 text-center mt-2">
                Téléchargez une image
            </p>
        </UPageCard>
    </div>
</template>

<script setup lang="ts">
import type { TemplateInput } from "~/types/template";

defineProps<{
    imageInputs: TemplateInput[];
}>();

const formData = defineModel<Record<string, string>>("formData");
const fileData = defineModel<Record<string, File>>("fileData");

function handleFileChange(fieldName: string, event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !fileData.value) return;

    fileData.value[fieldName] = file;

    const reader = new FileReader();
    reader.onload = (e) => {
        formData.value = {
            ...formData.value,
            [fieldName]: e.target?.result as string,
        };
    };

    reader.readAsDataURL(file);
}
</script>
