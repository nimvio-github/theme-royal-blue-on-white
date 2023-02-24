import WebLink from "@nimvio/live-preview-sdk";

export default defineNuxtPlugin(() => {
  const nimvioSdk = WebLink.init({
    queryParam: "testing",
  });

  return {
    provide: {
      nimvioSdk,
    },
  };
});
