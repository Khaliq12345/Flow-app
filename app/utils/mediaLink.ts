export default (imgId: string, folder: string = "") => {
  const config = useRuntimeConfig();
  return `${config.public.directusUrl}assets/${folder ? `${folder}/` : ""}${imgId}?access_token=${config.public.staticToken}`;
};
