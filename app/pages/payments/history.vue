<template>
  <div class="w-full px-8 space-y-6 pb-20 md:pb-5 overflow-y-auto">
    <Header title="Historique des Paiements" />

    <div class="p-4">
      <UTable :data="paiements" :columns="columns" class="flex-1" />
    </div>

    <Pagination v-model:current="page" :total="total" :per-page="4" />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

const page = ref(1);
const total = ref(10);

const UBadge = resolveComponent("UBadge");

type Paiement = {
  id: string;
  nom: string;
  modele: string;
  prix: string;
  statut: "valide" | "en_attente" | "echoue";
};

const paiements = ref<Paiement[]>([
  {
    id: "1",
    nom: "Pack Créateur Premium",
    modele: "Portfolio Pro",
    prix: "25 000 F",
    statut: "valide",
  },
  {
    id: "2",
    nom: "Pack Business Essentiel",
    modele: "Business Card",
    prix: "10 000 F",
    statut: "en_attente",
  },
  {
    id: "3",
    nom: "Pack Boutique Starter",
    modele: "Shop Basic",
    prix: "15 000 F",
    statut: "valide",
  },
  {
    id: "4",
    nom: "Pack Événement VIP",
    modele: "Event Plus",
    prix: "30 000 F",
    statut: "echoue",
  },
  {
    id: "5",
    nom: "Pack Restaurant Deluxe",
    modele: "Food & Taste",
    prix: "20 000 F",
    statut: "valide",
  },
]);

const statutConfig: Record<
  Paiement["statut"],
  { label: string; color: "success" | "warning" | "error" }
> = {
  valide: { label: "Validé", color: "success" },
  en_attente: { label: "En attente", color: "warning" },
  echoue: { label: "Échoué", color: "error" },
};

const columns: TableColumn<Paiement>[] = [
  {
    accessorKey: "nom",
    header: "Produit",
  },
  {
    accessorKey: "modele",
    header: "Modèle",
  },
  {
    accessorKey: "prix",
    header: "Prix",
  },
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
