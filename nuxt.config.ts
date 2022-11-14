import { generateRoutes } from "./utils/generateRoutes";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    // Update these values via Environment Variables
    // e.g NUXT_PUBLIC_HOST_URL or NUXT_PUBLIC_APICD_URL
    public: {
      hostURL: "http://localhost:500",
      APICD_URL: "",
      APIES_URL: "",
      projectId: "",
      pageContentId: "",
      styleContentId: "",
      header: {
        navContentId: "",
        panelContentId: "",
      },
      footer: {
        navContentId: "",
        panelContentId: "",
      },
    },
  },
  css: ["~/assets/styles/base.css"],
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxt/image-edge"],
  tailwindcss: {
    exposeConfig: true,
  },
  // https://github.com/nuxt/framework/issues/4919#issuecomment-1124349857
  // Generate dynamic routes (can use async)
  hooks: {
    "nitro:config": generateRoutes,
  },
  // Enable Image Optimization from external websites
  // https://v1.image.nuxtjs.org/configuration#domains
  image: {
    domains: [
      // "media-dev.nimvio.com",
      // "media.nimvio.com",
      // "st.depositphotos.com",
    ],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        // <meta name="description" content="My amazing site">
        {
          name: "description",
          content: "Nimvio Theme for Royal Blue on White",
        },
      ],
    },
  },
  typescript: {
    strict: false,
  },
});
