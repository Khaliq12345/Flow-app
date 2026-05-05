<template>
  <div class="w-full px-3 space-y-4 pb-20 md:pb-5 overflow-y-auto">
    <Header title="Historique des Paiements" />

    <!-- Desktop : tableau -->
    <div class="hidden md:block p-4">
      <UTable :data="paiements" :columns="columns" class="flex-1" />
    </div>

    <!-- Mobile : cards custom -->
    <div class="md:hidden space-y-3">
      <div
        v-for="item in paiements"
        :key="item.id"
        class="bg-background border border-default rounded-lg p-4 space-y-3"
      >
        <!-- Ligne 1 : référence + statut -->
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted">{{ item.id }}</span>
          <UBadge
            :label="statutConfig[item.statut].label"
            :color="statutConfig[item.statut].color"
            variant="subtle"
            size="sm"
          />
        </div>

        <USeparator />

        <!-- Ligne 2 : nom du pack -->
        <div class="space-y-0.5">
          <p class="text-xs text-muted">Produit</p>
          <p class="text-sm font-semibold text-highlighted">{{ item.nom }}</p>
        </div>

        <!-- Ligne 3 : modèle + prix côte à côte -->
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-0.5">
            <p class="text-xs text-muted">Modèle</p>
            <p class="text-sm text-default">{{ item.modele }}</p>
          </div>
          <div class="space-y-0.5 text-right">
            <p class="text-xs text-muted">Prix</p>
            <p class="text-sm font-semibold text-highlighted">
              {{ item.prix }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <Pagination v-model:current="page" :total="total" :per-page="4" />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

const UBadge = resolveComponent("UBadge");

const page = ref(1);
const total = ref(10);

type Paiement = {
  id: string;
  nom: string;
  modele: string;
  prix: string;
  statut: "valide" | "en_attente" | "echoue";
};

const statutConfig: Record<
  Paiement["statut"],
  { label: string; color: "success" | "warning" | "error" }
> = {
  valide: { label: "Validé", color: "success" },
  en_attente: { label: "En attente", color: "warning" },
  echoue: { label: "Échoué", color: "error" },
};

const paiements = ref<Paiement[]>([
  {
    id: "PAY-001",
    nom: "Pack Créateur Premium",
    modele: "Portfolio Pro",
    prix: "25 000 F",
    statut: "valide",
  },
  {
    id: "PAY-002",
    nom: "Pack Business Essentiel",
    modele: "Business Card",
    prix: "10 000 F",
    statut: "en_attente",
  },
  {
    id: "PAY-003",
    nom: "Pack Boutique Starter",
    modele: "Shop Basic",
    prix: "15 000 F",
    statut: "valide",
  },
  {
    id: "PAY-004",
    nom: "Pack Événement VIP",
    modele: "Event Plus",
    prix: "30 000 F",
    statut: "echoue",
  },
  {
    id: "PAY-005",
    nom: "Pack Restaurant Deluxe",
    modele: "Food & Taste",
    prix: "20 000 F",
    statut: "valide",
  },
]);

const columns: TableColumn<Paiement>[] = [
  { accessorKey: "id", header: "Référence" },
  { accessorKey: "nom", header: "Produit" },
  { accessorKey: "modele", header: "Modèle" },
  { accessorKey: "prix", header: "Prix" },
  {
    accessorKey: "statut",
    header: "Statut",
    cell: ({ row }) => {
      const { label, color } =
        statutConfig[row.getValue("statut") as Paiement["statut"]];
      return h(UBadge, { label, color, variant: "subtle", size: "sm" });
    },
  },
];
</script>
