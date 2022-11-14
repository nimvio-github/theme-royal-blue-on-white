import WebLink from "~~/lib/web-link/index";

export default defineNuxtPlugin(() => {
  const webLink = WebLink.init();
  return {
    provide: {
      onPreviewChange: webLink.addOnChangeHandler,
    },
  };
});
