<template>
  <section class="bg-light-white" v-bind="webLinkProps">
    <nav class="relative container h-24 mx-auto flex items-center flex-wrap">
      <div>
        <NuxtLink v-if="data.logo" to="/">
          <nuxt-img
            :src="data.logo"
            :alt="data.logoAlt || 'logo'"
            class="max-h-8 h-auto w-auto"
            height="32"
            width="165"
            format="webp"
            fit="inside"
          />
        </NuxtLink>
      </div>
      <div class="flex flex-grow"></div>
      <!-- Desktop -->
      <div class="hidden lg:flex items-center mx-4 gap-8 h-full">
        <template v-for="item in data.items">
          <header-nav-item
            v-if="item.show"
            :key="item.text"
            :data-kontent-item-id="item.ContentID"
            :data-kontent-element-codename="item.TemplateName"
            :text="item.text"
            :to="item.to"
            :nav-childs="item.children"
          />
        </template>
      </div>
      <div class="flex flex-grow"></div>
      <header-nav-search
        class="hidden lg:flex"
        href="javascript:void(0)"
        @click="state.searchOpen = !state.searchOpen"
      />
      <div class="lg:hidden block">
        <header-nav-hamburger
          :class="state.open && 'open'"
          @click="state.open = !state.open"
        />
      </div>
    </nav>
    <div v-if="state.searchOpen" class="container hidden lg:block py-4 w-full">
      <header-nav-search-input />
    </div>
    <!-- Mobile -->
    <nav v-if="state.open" class="w-full block lg:hidden bg-white">
      <div class="container block lg:hidden py-4 w-full">
        <header-nav-search-input />
      </div>
      <hr />
      <div class="container mx-auto py-8 flex flex-col gap-4">
        <template v-for="item in data.items">
          <header-nav-item
            v-if="item.show"
            :key="item.text"
            :text="item.text"
            :data-kontent-item-id="item.ContentID"
            :data-kontent-element-codename="item.TemplateName"
            :to="item.to"
            :nav-childs="item.children"
          />
        </template>
      </div>
    </nav>
  </section>
</template>

<script setup>
// import config from "~~/helpers/config";
import { getChildPages, getContentById } from "~~/utils/dataFetching";

const { public: config } = useRuntimeConfig();

const webLinkProps = {
  "data-kontent-item-id": config.header.navContentId,
  "data-kontent-element-codename": "Header Nav",
};

const { data } = await useAsyncData("headerNav", async ({ $gqlClient }) => {
  const { data: response } = await getContentById(
    $gqlClient,
    config.header.navContentId
  );
  const navItemIds = response.Data.navItems.ContentIDs;
  const navItems = navItemIds.map(async (id) => {
    const { data: navResponse } = await getContentById($gqlClient, id);
    const { data: childNavResponse } = await getChildPages($gqlClient, id);

    const navItem = {
      text: navResponse.Data.navigationTitle || navResponse.Data.pageTitle,
      to: navResponse.Data.pageSlug,
      show: navResponse.Data.navigation?.showInMenu,
      children: childNavResponse.reduce((filtered, navChild) => {
        const item = {
          text: navChild.Data.navigationTitle || navChild.Data.pageTitle,
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
  return {
    items: await Promise.all(navItems),
    logo: response.Data.logo?.MediaUrl,
    logoAlt: response.Data.logo?.AltText,
  };
});

const state = reactive({
  open: false,
  searchOpen: false,
});
</script>
