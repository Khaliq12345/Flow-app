<template>
  <UDashboardSidebar
    collapsible
    resizable
    :ui="{ footer: 'border-t border-default' }"
  >
    <template #header="{ collapsed }">
      <h1 v-if="!collapsed" class="pl-2 text-5xl font-bold">Flow</h1>
      <UIcon
        v-else
        name="i-simple-icons-nuxtdotjs"
        class="size-5 text-primary mx-auto"
      />
    </template>

    <template #toggle>
      <UDashboardSidebarToggle variant="subtle" />
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
        :collapsed="collapsed"
        :items="mainItems"
        orientation="vertical"
      />

      <UButton
        :label="collapsed ? undefined : 'Nouvelle Génération'"
        icon="i-lucide-sparkles"
        color="primary"
        variant="solid"
        block
        :square="collapsed"
        class="mt-auto"
        to="/generation"
      />
    </template>
  </UDashboardSidebar>
</template>

<script lang="ts" setup>
const mainItems = mainNavItems;
</script>
