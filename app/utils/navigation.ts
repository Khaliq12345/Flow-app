import type { NavigationMenuItem } from "@nuxt/ui";

export const mainNavItems: NavigationMenuItem[] = [
  {
    label: "Accueil",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "Médias",
    icon: "i-lucide-image",
    to: "/medias",
  },
  {
    label: "Modèles",
    icon: "i-lucide-box",
    to: "/modeles",
  },
  {
    label: "Paramètres",
    icon: "i-lucide-settings",
    to: "/parametres",
  },
];
