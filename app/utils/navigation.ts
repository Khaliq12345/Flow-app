import type { NavigationMenuItem } from "@nuxt/ui";

export const mainNavItems: NavigationMenuItem[] = [
  {
    label: "Accueil",
    icon: "i-lucide-house",
    to: "/",
    exact: true,
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
    label: "Générations",
    icon: "i-lucide-clock",
    to: "/generations",
  },
  {
    label: "Paramètres",
    icon: "i-lucide-settings",
    to: "/settings",
    inPopover: true,
  },
];
