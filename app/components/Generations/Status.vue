<template>
    <div>
        <UCard variant="outline" :ui="{ body: 'p-5 sm:p-5' }">
            <div class="space-y-4">
                <!-- Status -->
                <div class="space-y-2">
                    <span
                        class="text-xs font-semibold tracking-wider text-muted uppercase"
                    >
                        Statut
                    </span>
                    <div>
                        <UBadge
                            :label="statusLabel"
                            :color="statusColor"
                            variant="subtle"
                            size="lg"
                            class="capitalize"
                        />
                    </div>
                </div>

                <USeparator />

                <!-- Pay Button -->
                <UButton
                    v-if="paymentUrl"
                    :to="paymentUrl"
                    target="_blank"
                    color="neutral"
                    variant="solid"
                    size="xl"
                    block
                    label="Payer"
                />

                <!-- Template link -->
                <div
                    class="flex items-start gap-3 text-sm cursor-pointer rounded-lg bg-primary/5 px-3 py-3 hover:bg-primary/10 transition-colors"
                    @click="
                        navigateTo(
                            `/generation?templateId=${generations?.template_id}`,
                        )
                    "
                >
                    <div
                        class="flex items-center justify-center size-5 rounded-full bg-primary shrink-0 mt-0.5"
                    >
                        <UIcon name="i-lucide-info" class="size-3 text-white" />
                    </div>
                    <span
                        class="text-default hover:underline underline-offset-2 decoration-primary"
                    >
                        Cliquez ici pour voir le modèle utilisé.
                    </span>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import type { Generations } from "~/types/generations";

defineProps<{
    paymentUrl?: string;
}>();

const generations = defineModel<Generations | null>("generations");
const statusLabel = computed(() => {
    if (generations.value?.status === "pending") return "En Attente";
    if (generations.value?.status === "completed") return "Terminé";
    return "Échoué";
});

const statusColor = computed(() => {
    if (generations.value?.status === "pending") return "warning";
    if (generations.value?.status === "completed") return "success";
    return "error";
});
</script>
