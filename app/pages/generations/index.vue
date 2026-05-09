<template>
  <!-- root -->
  <div class="rootdiv">
    <!-- header -->
    <Header
      title="Historique de vos générations"
      description="Retrouvez toutes vos générations précédentes"
    />
    <Loading v-if="loading" />
    <!-- content -->
    <div v-else class="space-y-2">
      <UTable :data="generations" :columns="columns" class="w-full" />
      <!-- Pagination -->
      <Pagination v-model:current="page" :total="total" :per-page="limit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { Generations } from "~/types/generations";

const { fetchGenerations, fetchGenerationsCount } = useGenerations();

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

const loading = ref(true);
const page = ref(1);
const total = ref(0);
const limit = 6;

const generations = ref<Generations[]>([]);

const statusLabels: Record<string, string> = {
  completed: "Terminé",
  failed: "Échoué",
  pending: "En attente",
  payment_pending: "Paiement en attente",
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
          payment_pending: "error" as const,
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
          const generationId = useState("generationId");
          generationId.value = row.original.id;
          navigateTo("/generations/detail");
        },
      });
    },
  },
];

async function getGenerations(newPage: number = 1) {
  loading.value = true;
  page.value = newPage;
  generations.value = await fetchGenerations(limit, (page.value - 1) * limit);
  total.value = await fetchGenerationsCount("video");
  loading.value = false;
}

onMounted(getGenerations);
</script>

<style></style>
