<template>
  <div v-bind="webLinkProps">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { getContentById } from "./utils/dataFetching";
import { StylesTemplate } from "./models/templates.model";

const { public: publicConfig } = useRuntimeConfig();

const webLinkProps = {
  "data-kontent-project-id": publicConfig.projectId,
  "data-kontent-language-codename": "default",
};

const { data } = await useAsyncData("app", async ({ $gqlClient }) => {
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
});

const customStyles = computed(() => {
  const styles = data.value.styles.map((style) => {
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
  data.value.styles.forEach((style) => {
    // Add style from externalCss
    if (style.Data.externalCss) {
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

useHead({
  bodyAttrs: {
    class: "font-sans text-dark-gray",
  },
  style: [...customStyles.value],
  link: [...customLinks.value],
});
</script>
