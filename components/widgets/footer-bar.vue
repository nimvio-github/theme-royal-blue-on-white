<template>
  <div class="container mx-auto py-8" v-bind="webLinkProps">
    <div class="flex flex-col md:flex-row">
      <NuxtLink to="/">
        <h5 class="text-2xl font-bold py-4 text-white">{{ data.title }}</h5>
      </NuxtLink>
      <div class="flex-grow"></div>
      <div class="flex gap-2 items-center -mx-3">
        <common-icon-link
          v-for="social in data.socialLinks"
          :key="social.name"
          :icon-name="social.name"
          :data-kontent-item-id="social.ContentID"
          :data-kontent-element-codename="social.TemplateName"
          icon-size="1.5em"
          :to="social.to"
          target="_blank"
          class="text-dark-white hover:text-light-white p-3"
          :aria-label="social.name"
        />
      </div>
    </div>
    <div
      class="grid grid-flow-row auto-rows-fr md:grid-flow-col md:auto-cols-fr gap-4 md:gap-8 mt-8"
    >
      <template v-for="item in data.items">
        <footer-nav-item
          v-if="item"
          :key="item.text"
          :data-kontent-item-id="item.ContentID"
          :data-kontent-element-codename="item.TemplateName"
          :text="item.text"
          :to="item.to"
          :nav-childs="item.children"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useAttrs } from "vue";
import { getContentById, getChildPages } from "~~/utils/dataFetching";

const attrs = useAttrs();

const { datasource } = attrs;
const datasourceId = datasource.ContentIDs[0];

const webLinkProps = {
  "data-kontent-item-id": datasourceId,
  "data-kontent-element-codename": "Footer Bar",
};

const { data } = await useAsyncData("footerBar", async ({ $gqlClient }) => {
  const { data: response } = await getContentById($gqlClient, datasourceId);

  const navigableItemsId = response.Data.navigationItems.ContentIDs[0];
  const { data: pages } = await getChildPages($gqlClient, navigableItemsId);
  const items = pages.map((page) => {
    const pageData = page.Data;

    if (!pageData.navigation.showInMenu) return null;

    return {
      text: pageData.navigationTitle || pageData.pageTitle,
      to: pageData.pageSlug,
      navigationTitle: pageData.navigationTitle,
      children: [],
      ...page,
    };
  });

  const socialLinkIds = response.Data.socialMediaLinks.ContentIDs;
  const socialLinks = socialLinkIds.map(async (id) => {
    const { data: socialLinkResponse } = await getContentById($gqlClient, id);
    const socialLink = {
      name: socialLinkResponse.Data.type.toLowerCase(),
      to: socialLinkResponse.Data.link,
      ...socialLinkResponse,
    };
    return socialLink;
  });

  return {
    response,
    items,
    socialLinks: await Promise.all(socialLinks),
    title: response.Data.websiteName,
  };
});
</script>
