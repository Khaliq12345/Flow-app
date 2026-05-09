<!-- components/MissingTemplateModal.vue -->
<template>
  <UPageCard
    icon="i-lucide-alert-triangle"
    title="Template non trouvé"
    description="Le template sélectionné n'existe pas ou a été supprimé. Veuillez choisir un template valide depuis la bibliothèque."
    variant="subtle"
    highlight
    highlight-color="error"
    :ui="{
      leadingIcon: 'text-error size-6',
      title: 'text-base',
    }"
  >
    <template #footer>
      <div class="flex flex-col gap-3">
        <!-- Bloc d'info secondaire -->
        <div
          class="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2.5"
        >
          <UIcon name="i-lucide-info" class="text-gray-400 size-4 shrink-0" />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Si vous pensez que c'est une erreur, contactez le support de Flow.
          </p>
        </div>

        <UButton
          label="Parcourir les templates"
          color="error"
          to="/template"
          icon="i-lucide-box"
          block
        />
      </div>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();
</script>
