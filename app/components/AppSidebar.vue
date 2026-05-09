<template>
    <UDashboardSidebar
        collapsible
        resizable
        :ui="{
            footer: 'border-t border-default',
            root: 'hidden md:flex flex-col',
        }"
    >
        <template #header="{ collapsed }">
            <div class="w-full flex flex-col items-center gap-2 py-2">
                <div
                    class="flex w-full items-center"
                    :class="collapsed ? 'justify-center' : 'justify-between'"
                >
                    <h1 v-if="!collapsed" class="pl-2 text-5xl font-bold">
                        Flow
                    </h1>
                    <UIcon
                        v-else
                        name="i-simple-icons-nuxtdotjs"
                        class="size-5 text-primary"
                    />

                    <UDashboardSidebarCollapse
                        v-if="!collapsed"
                        variant="ghost"
                        color="neutral"
                        icon="i-lucide-chevron-left"
                    />
                </div>

                <!-- Bouton en bas quand fermé -->
                <UDashboardSidebarCollapse
                    v-if="collapsed"
                    variant="ghost"
                    color="neutral"
                    class="mt-auto"
                    icon="i-lucide-chevron-right"
                />
            </div>
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
                :label="collapsed ? undefined : 'Déconnexion'"
                icon="i-lucide-log-out"
                color="error"
                variant="outline"
                block
                :square="collapsed"
                class="mt-auto"
                @click="cleanUser()"
                to="/login"
            />
        </template>
    </UDashboardSidebar>
</template>

<script lang="ts" setup>
const { cleanUser } = useAuthStore();

const mainItems = mainNavItems;
</script>
