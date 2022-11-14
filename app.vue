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
      innerHTML: style.Data.internalCss
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, "")
        .replace(/&quot;/g, '"'),
    };
    return styleObj;
  });
  return styles;
});

const customFonts = computed(() => {
  const fonts = [];
  data.value.styles.forEach((style) => {
    const formattedFonts = style.Data.fonts.map((font) => {
      const fontObj = {
        rel: "stylesheet",
        as: "style",
        href: font.Data.linkUrl,
      };
      return fontObj;
    });
    fonts.push(...formattedFonts);
  });
  return fonts;
});

useHead({
  bodyAttrs: {
    class: "font-sans text-dark-gray",
  },
  style: [...customStyles.value],
  link: [...customFonts.value],
});
</script>
