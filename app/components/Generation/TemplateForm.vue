<template>
    <div class="space-y-6">
        <!-- Project Name Input -->

        <!-- Text Inputs Grid (Textareas) -->
        <GenerationTextForm
            :textInputs="textInputs"
            v-model:formData="formData"
        ></GenerationTextForm>

        <!-- Image Inputs Grid (Textareas) -->

        <GenerationMediaForm
            v-model:formData="formData"
            v-model:fileData="fileData"
            :imageInputs="imageInputs"
        ></GenerationMediaForm>

        <!-- Generate Button -->

        <UButton
            label="Générer le contenu"
            icon="i-lucide-sparkles"
            color="primary"
            size="lg"
            @click="handleSubmit"
            :loading="paymentLoading"
        />
    </div>
</template>

<script setup lang="ts">
import type { TemplateInput } from "~/types/template";

const props = defineProps<{
    inputs: TemplateInput[];
    templateId: string;
    type: string;
    price: number;
}>();

const authStore = useAuthStore();

const formData = ref<Record<string, string>>({});
const fileData = ref<Record<string, File>>({});
const projectName = ref("");

const emit = defineEmits<{
    "update:formData": [value: Record<string, string>];
    generate: [];
}>();

const imageInputs = computed(() =>
    props.inputs.filter((f) => f.type === "image"),
);

const textInputs = computed(() =>
    props.inputs.filter((f) => f.type === "text"),
);
const { paymentLoading, startPayment } = useGenerationForm({
    templateId: toRef(props, "templateId"),
    type: toRef(props, "type"),
    price: toRef(props, "price"),
    projectName,
});

async function handleSubmit() {
    await authStore.setAuthenticated();
    if (!authStore.isAuthenticated) {
        return navigateTo("/login");
    } else {
        await startPayment(
            imageInputs.value,
            textInputs.value,
            formData.value,
            fileData.value,
        );
    }
}
</script>
