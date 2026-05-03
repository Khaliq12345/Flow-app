import type { NavigationMenuItem } from "@nuxt/ui";

export const mainNavItems: NavigationMenuItem[] = [
  {
    label: "Accueil",
    icon: "i-lucide-house",
    to: "/",
    exact: true,
  },
  {
    label: "Médias",
    icon: "i-lucide-image",
    to: "/medias",
  },
  {
    label: "Modèles",
    icon: "i-lucide-box",
    to: "/template",
    exact: false,
    children: [
      {
        label: "Image",
        icon: "i-lucide-image",
        to: "/template/image",
      },
      {
        label: "Vidéo",
        icon: "i-lucide-video",
        to: "/template/video",
      },
    ],
  },
  {
    label: "Paramètres",
    icon: "i-lucide-settings",
    to: "/parametres",
  },
];
