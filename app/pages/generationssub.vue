<template>
  <!-- root -->
  <div class="rootdiv">
    <!-- header -->
    <Header
      title="Historique de vos générations"
      description="Retrouvez toutes vos générations précédentes"
    />
    <!-- content -->
    <UTable :data="paginatedGenerations" :columns="columns" class="w-full" />
    <!-- Pagination -->
    <Pagination
      v-model:current="page"
      :total="totalGenerations"
      :per-page="itemsPerPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { Generations } from "~/types/generations";

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

const page = ref(1);
const itemsPerPage = 4;

const allGenerations: Generations[] = [
  {
    id: "gen-1",
    name: "Cyber City Sunset",
    user_id: "user-1",
    template_id: "template-1",
    input_media: "input-1",
    status: "completed",
    outputs_media: "output-1",
  },
  {
    id: "gen-2",
    name: "Neon Street Animation",
    user_id: "user-1",
    template_id: "template-2",
    input_media: "input-2",
    status: "completed",
    outputs_media: "output-2",
  },
  {
    id: "gen-3",
    name: "Tokyo Night Loop",
    user_id: "user-1",
    template_id: "template-3",
    input_media: "input-3",
    status: "completed",
    outputs_media: "output-3",
  },
  {
    id: "gen-4",
    name: "Rainy Alley Render",
    user_id: "user-1",
    template_id: "template-4",
    input_media: "input-4",
    status: "completed",
    outputs_media: "output-4",
  },
  {
    id: "gen-5",
    name: "Synthwave Sunset Motion",
    user_id: "user-1",
    template_id: "template-5",
    input_media: "input-5",
    status: "completed",
    outputs_media: "output-5",
  },
  {
    id: "gen-6",
    name: "Blade Runner Scene",
    user_id: "user-1",
    template_id: "template-6",
    input_media: "input-6",
    status: "pending",
    outputs_media: "",
  },
  {
    id: "gen-7",
    name: "Forest Mist Animation",
    user_id: "user-1",
    template_id: "template-7",
    input_media: "input-7",
    status: "completed",
    outputs_media: "output-7",
  },
  {
    id: "gen-8",
    name: "Ocean Wave Loop",
    user_id: "user-1",
    template_id: "template-8",
    input_media: "input-8",
    status: "completed",
    outputs_media: "output-8",
  },
  {
    id: "gen-9",
    name: "Mountain Landscape",
    user_id: "user-1",
    template_id: "template-9",
    input_media: "input-9",
    status: "failed",
    outputs_media: "",
  },
  {
    id: "gen-10",
    name: "Space Station Render",
    user_id: "user-1",
    template_id: "template-10",
    input_media: "input-10",
    status: "completed",
    outputs_media: "output-10",
  },
  {
    id: "gen-11",
    name: "Urban Decay Loop",
    user_id: "user-1",
    template_id: "template-11",
    input_media: "input-11",
    status: "completed",
    outputs_media: "output-11",
  },
  {
    id: "gen-12",
    name: "Desert Storm Animation",
    user_id: "user-1",
    template_id: "template-12",
    input_media: "input-12",
    status: "pending",
    outputs_media: "",
  },
];

const statusLabels: Record<string, string> = {
  completed: "Terminé",
  failed: "Échoué",
  pending: "En attente",
};

const columns: TableColumn<Generations>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color =
        {
          completed: "success" as const,
          failed: "error" as const,
          pending: "warning" as const,
        }[status] ?? ("neutral" as const);

      return h(
        UBadge,
        { class: "capitalize", variant: "subtle", color },
        () => statusLabels[status] ?? status,
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    meta: {
      class: {
        td: "text-right",
        th: "text-right",
      },
    },
    cell: ({ row }) => {
      return h(UButton, {
        label: "Voir les détails",
        color: "primary",
        variant: "outline",
        size: "sm",
        onClick: () => {
          // navigateTo(`/generations/${row.original.id}`)
          console.log("Voir les détails de :", row.original.id);
        },
      });
    },
  },
];

const totalGenerations = computed(() => allGenerations.length);

const paginatedGenerations = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allGenerations.slice(start, end);
});
</script>

<style></style>
