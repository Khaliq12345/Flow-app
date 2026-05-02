/**
 * Types pour la page d'accueil
 */

/** Structure d'un item de template */
export interface TemplateListItem {
  /** Nom du template */
  name: string;
  /** Description courte */
  description: string;
  /** Classe de l'icône (ex: i-lucide-*) */
  icon: string;
  /** Lien vers la page de génération avec templateId */
  to: string;
}

/** Props du composant HomeTemplateList */
export interface HomeTemplateListProps {
  /** Titre de la section */
  title: string;
  /** Liste des templates à afficher */
  items: TemplateListItem[];
  /** Lien pour "Voir plus" */
  viewMoreLink: string;
}
