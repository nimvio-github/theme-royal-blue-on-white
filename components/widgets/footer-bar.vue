<template>
  <div class="container mx-auto py-8">
    <div class="flex flex-col md:flex-row">
      <NuxtLink to="/">
        <h5 class="text-2xl font-bold py-4 text-white">{{ props.title }}</h5>
      </NuxtLink>
      <div class="flex-grow"></div>
      <div class="flex gap-2 items-center -mx-3">
        <common-icon-link
          v-for="social in props.socialLinks"
          :key="social.ContentID"
          :icon-name="social.Data.type.toLowerCase()"
          :data-nimvio-content-id="social.ContentID"
          :data-nimvio-template-name="social.TemplateName"
          icon-size="1.5em"
          :to="social.Data.link"
          target="_blank"
          class="text-dark-white hover:text-light-white p-3"
          :aria-label="social.Data.type.toLowerCase()"
        />
      </div>
    </div>
    <div
      class="grid grid-flow-row auto-rows-fr md:grid-flow-col md:auto-cols-fr gap-4 md:gap-8 mt-8"
    >
      <template v-for="item in data.items">
        <footer-nav-item
          v-if="item && item.isShow"
          :key="item.text"
          :data-nimvio-content-id="item.ContentID"
          :data-nimvio-template-name="item.TemplateName"
          :text="item.text"
          :to="item.to"
          :nav-childs="item.children"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { getChildPages } from "~~/utils/dataFetching";

const props = defineProps({
  navigationItemsId: {
    type: String,
    required: true,
  },
  socialLinks: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const { data } = await useAsyncData("footerBar", async ({ $gqlClient }) => {
  const { data: pages } = await getChildPages(
    $gqlClient,
    props.navigationItemsId
  );
  const items = pages.map((page) => {
    const pageData = page.Data;

    return {
      text: pageData.navigationTitle || pageData.pageTitle,
      to: pageData.pageSlug,
      navigationTitle: pageData.navigationTitle,
      children: [],
      isShow: pageData.navigation.showInMenu,
      ...page,
    };
  });

  return {
    items,
  };
});

const { $nimvioSdk } = useNuxtApp();
onBeforeMount(() => {
  $nimvioSdk.livePreviewUtils.onPreviewContentChange((formData) => {
    data.value.items = data.value.items.map((item) => {
      if (item.ContentID === formData.id) {
        return {
          ...item,
          text:
            formData.formData.navigationTitle || formData.formData.pageTitle,
          to: formData.formData.urlPath,
          navigationTitle: formData.formData.navigationTitle,
          isShow: formData.formData.navigation.showInMenu,
        };
      }
      return item;
    });
  });
});
</script>
