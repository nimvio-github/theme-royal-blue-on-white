<template>
  <div v-bind="webLinkProps">
    <ClientOnly>
      <span
        v-if="isInsideIframe()"
        :data-nimvio-content-id="publicConfig.styleContentId"
        data-nimvio-template-name="styles"
        >Website Styles</span
      >
    </ClientOnly>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { getContentById } from "./utils/dataFetching";
import { StylesData, StylesTemplate } from "./models/templates.model";
import { ConfigRoute } from "./composables/getFullSlug";
import stringToSlug from "./utils/stringToSlug";

const { public: publicConfig } = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const isInsideIframe = () => window.self !== window.top;

const webLinkProps = {
  "data-nimvio-project-id": publicConfig.projectId,
  "data-kontent-language-codename": "default",
};

const { data: styleData } = await useAsyncData(
  "app-style",
  async ({ $gqlClient }) => {
    const { data: response } = await getContentById<StylesTemplate>(
      $gqlClient,
      publicConfig.styleContentId,
      { deep: true }
    );
    const pageData = response.Data;

    return {
      pageData,
      styles: pageData.styles,
    };
  }
);

const customStyles = computed(() => {
  const styles = styleData.value.styles.map((style) => {
    const styleObj = {
      type: "text/css",
      innerHTML: style.Data.internalCss
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, "")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, ">"),
    };
    return styleObj;
  });
  return styles;
});

const customLinks = computed(() => {
  const links = [];
  styleData.value.styles.forEach((style) => {
    // Add style from externalCss
    if (style.Data.externalCss && typeof style.Data.externalCss === "string") {
      links.push({
        rel: "stylesheet",
        as: "style",
        href: style.Data.externalCss,
      });
    }
    const formattedFonts = style.Data.fonts.map((font) => {
      const fontObj = {
        rel: "stylesheet",
        as: "style",
        href: font.Data.linkUrl,
      };
      return fontObj;
    });
    links.push(...formattedFonts);
  });
  return links;
});

const { $nimvioSdk } = useNuxtApp();
onBeforeMount(() => {
  $nimvioSdk.livePreviewUtils.onPreviewContentChange<StylesData>((formData) => {
    if (formData.id === publicConfig.styleContentId) {
      styleData.value.styles = formData.formData.styles;
    }
  });

  // Open the content page when the content is opened inside the Nimvio
  $nimvioSdk.livePreviewUtils.onOpenPreviewContent<any>((data) => {
    const availableRoutes = publicConfig.routes as ConfigRoute[];
    const targetRoute = availableRoutes.find(
      (availableRoute) => availableRoute.ContentID === data.id
    );
    if (data.templateName.startsWith("Page")) {
      if (targetRoute) {
        const currentPath =
          route.path !== "/" && route.path.endsWith("/")
            ? route.path.slice(0, -1)
            : route.path;
        currentPath !== targetRoute.route &&
          router.push(targetRoute.route === "/home" ? "/" : targetRoute.route);
      } else {
        router.push({
          path: stringToSlug(data.formData.name),
          query: {
            isNewPage: "true",
            contentId: data.id,
          },
        });
      }
    }
  });

  $nimvioSdk.livePreviewUtils.onNewPreviewContent<any>((data) => {
    console.log("onNewPreviewContent", data);
    router.push({
      path: stringToSlug(data.formData.name),
      query: {
        isNewPage: "true",
        contentId: data.id,
      },
    });
  });
});

// Use function to make it reactive
useHead(() => ({
  bodyAttrs: {
    class: "font-sans text-dark-gray",
  },
  style: [...customStyles.value],
  link: [...customLinks.value],
}));
</script>
