export const templateList = [
  {
    GrzDrsoszTJaZvPhKd72CFA2: [
      { name: "profile", type: "image", description: "Image de serviteur" },
      { name: "bio", type: "texte", description: "Description du profil" },
    ],
  },
  {
    Xk92LmPqR8YtUeWzA1BcDeF3: [
      { name: "profile", type: "image", description: "Photo utilisateur" },
      { name: "about", type: "texte", description: "Présentation détaillée" },
    ],
  },
  {
    QwErTyUiOp1234567890ZxCv: [
      { name: "thumbnail", type: "image", description: "Miniature" },
      { name: "description", type: "texte", description: "Texte descriptif" },
    ],
  },
  {
    AsDfGhJkL0987654321MnBv: [
      { name: "cover", type: "image", description: "Image de couverture" },
      { name: "notes", type: "texte", description: "Notes associées" },
    ],
  },
  {
    ZxCvBnMaSdFgHjKlQwErTy12: [
      { name: "avatar", type: "image", description: "Avatar utilisateur" },
      { name: "summary", type: "texte", description: "Résumé rapide" },
    ],
  },
  {
    PlOkMnIjUhYgTfRdEsWaQx09: [
      { name: "header", type: "image", description: "Image d’en-tête" },
      { name: "content", type: "texte", description: "Contenu principal" },
    ],
  },
  {
    UiOpLkJhGfDsAzXcVbNm1234: [
      { name: "banner", type: "image", description: "Bannière visuelle" },
      { name: "caption", type: "texte", description: "Légende associée" },
    ],
  },
  {
    MnbVcXzLkJhGfDsAqWeRtY98: [
      { name: "icon", type: "image", description: "Icône représentative" },
      { name: "details", type: "texte", description: "Détails textuels" },
    ],
  },
  {
    AaBbCcDdEeFfGgHhIiJjKk11: [
      { name: "profile", type: "image", description: "Image principale" },
      { name: "cover", type: "image", description: "Image de couverture" },
      { name: "thumbnail", type: "image", description: "Miniature" },
      { name: "gallery_1", type: "image", description: "Image galerie 1" },
      { name: "gallery_2", type: "image", description: "Image galerie 2" },
      { name: "bio", type: "texte", description: "Biographie" },
      {
        name: "description",
        type: "texte",
        description: "Description détaillée",
      },
      { name: "notes", type: "texte", description: "Notes internes" },
      { name: "summary", type: "texte", description: "Résumé rapide" },
    ],
  },
];

export function getTemplateById(id: string) {
  const found = templateList.find((obj) =>
    Object.prototype.hasOwnProperty.call(obj, id),
  );
  return found ? found[id as keyof typeof found] : null;
}

export function getRandomTemplateId() {
  const ids = templateList.map((obj) => Object.keys(obj)[0]);
  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
}
