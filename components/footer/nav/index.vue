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
      <footer-nav-item
        v-for="item in data.items"
        :key="item.text"
        :data-kontent-item-id="item.ContentID"
        :data-kontent-element-codename="item.TemplateName"
        :text="item.text"
        :to="item.to"
        :nav-childs="item.children"
      />
    </div>
  </div>
</template>

<script setup>
// import config from "~~/helpers/config";
import { getChildPages, getContentById } from "~~/utils/dataFetching";

const { public: config } = useRuntimeConfig();

const webLinkProps = {
  "data-kontent-item-id": config.footer.navContentId,
  "data-kontent-element-codename": "Footer Nav",
};

const { data } = await useAsyncData("footerNav", async ({ $gqlClient }) => {
  const { data: response } = await getContentById(
    $gqlClient,
    config.footer.navContentId
  );
  const navItemIds = response.Data.navItems.ContentIDs;
  const socialLinkIds = response.Data.socialMediaLinks.ContentIDs;
  const navItems = navItemIds.map(async (id) => {
    const { data: navResponse } = await getContentById($gqlClient, id);
    const { data: childNavResponse } = await getChildPages($gqlClient, id);

    const navItem = {
      text: navResponse.Data.navigationTitle || navResponse.Data.pageTitle,
      to: navResponse.Data.pageSlug,
      show: navResponse.Data.navigation?.showInMenu,
      children: childNavResponse.reduce((filtered, navChild) => {
        const item = {
          text: navChild.Data.pageTitle || navChild.Data.pageTitle,
          to: `${navResponse.Data.pageSlug}/${navChild.Data.pageSlug}`,
          ...navChild,
        };
        if (navChild.Data.navigation?.showInMenu) {
          filtered.push(item);
        }
        return filtered;
      }, []),
      ...navResponse,
    };
    return navItem;
  });
  const socialLinks = socialLinkIds.map(async (id) => {
    const { data: socialLinkResponse } = await getContentById($gqlClient, id);
    const socialLink = {
      name: socialLinkResponse.Data.type,
      to: socialLinkResponse.Data.link,
      ...socialLinkResponse,
    };
    return socialLink;
  });
  return {
    items: await Promise.all(navItems),
    socialLinks: await Promise.all(socialLinks),
    title: response.Data.websiteName,
  };
});
</script>
