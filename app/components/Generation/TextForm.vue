<template>
    <div
        v-if="textInputs.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 bg-amber-900 p-5"
    >
        <UFormField label="Nom du Projet">
            <UTextarea
                v-model="projectName"
                color="neutral"
                variant="solid"
                placeholder="Entrez le nom du projet"
                class="w-full border-2 border-solid"
            />
        </UFormField>
        <UFormField
            v-for="(field, index) in textInputs"
            :key="`text-${index}`"
            :title="field.name"
            :description="field.description"
            class="group hover:border-primary-400 transition-colors"
        >
            <UTextarea
                v-model="formData[field.name]"
                variant="none"
                :placeholder="`Entrez ${field.description.toLowerCase()}...`"
                :ui="{
                    root: 'p-2 rounded-lg bg-gray-50 dark:bg-gray-800 ',
                    base: 'text-sm p-0',
                }"
                class="w-full"
            />
        </UFormField>
    </div>
</template>

<script setup lang="ts">
import type { TemplateInput } from "~/types/template";

defineProps<{
    textInputs: TemplateInput[];
}>();

const formData = defineModel<Record<string, string>>("formData");
</script>
