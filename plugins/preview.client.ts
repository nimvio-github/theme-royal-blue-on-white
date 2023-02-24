/**
 * Automatically refresh page data if there is a preview query
 */
export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();
  const preview = route.query.preview && route.query.preview === "true";

  if (preview) {
    nuxtApp.hook("page:finish", () => {
      refreshNuxtData(route.path);
    });
  }

  return { provide: { preview } };
});
