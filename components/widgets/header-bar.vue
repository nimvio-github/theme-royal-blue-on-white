<template>
  <section class="navbar">
    <nav class="container navbar__wrapper">
      <div>
        <NuxtLink v-if="props.logo" to="/">
          <nuxt-img
            :src="props.logo"
            :alt="props.logoAlt || 'website logo'"
            class="navbar__logo"
            height="32"
            width="165"
            format="webp"
            fit="inside"
          />
        </NuxtLink>
      </div>

      <div class="navbar__menu-separator"></div>

      <!-- Desktop -->
      <div class="navbar__links">
        <template v-for="item in data.items">
          <header-nav-item
            v-if="item && item.isShow"
            :key="item.id"
            :data-nimvio-content-id="item.ContentID"
            :data-nimvio-template-name="item.TemplateName"
            :text="item.text"
            :to="item.to"
            :nav-childs="item.children"
          />
        </template>
      </div>
      <div class="navbar__menu-separator"></div>

      <header-nav-search
        href="javascript:void(0)"
        @click="state.searchOpen = !state.searchOpen"
      />
      <header-nav-hamburger
        :class="state.open && 'open'"
        @click="state.open = !state.open"
      />
    </nav>

    <header-nav-search-input
      v-if="state.searchOpen"
      class="navbar__search--desktop"
    />

    <!-- Mobile -->
    <nav v-if="state.open" class="navbar__wrapper--mobile">
      <header-nav-search-input />
      <hr />
      <div class="container navbar__links--mobile">
        <template v-for="item in data.items">
          <header-nav-item
            v-if="item && item.isShow"
            :key="item.id"
            :text="item.text"
            :data-nimvio-content-id="item.ContentID"
            :data-nimvio-template-name="item.TemplateName"
            :to="item.to"
            :nav-childs="item.children"
          />
        </template>
      </div>
    </nav>
  </section>
</template>

<script setup>
import { getChildPages } from "~~/utils/dataFetching";

const props = defineProps({
  navigationItemsId: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  logoAlt: {
    type: String,
    default: "",
  },
});

const { data } = await useAsyncData("headerBar", async ({ $gqlClient }) => {
  const { data: pages } = await getChildPages(
    $gqlClient,
    props.navigationItemsId
  );

  const items = pages.map((page) => {
    const pageData = page.Data;

    return {
      text: pageData.navigationTitle || pageData.pageTitle,
      to: pageData.urlPath,
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

const state = reactive({
  open: false,
  searchOpen: false,
});
</script>

<style lang="scss">
.navbar {
  background-color: $nimvio-white;
}

.navbar__wrapper {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  align-items: center;
  height: 6rem;
  margin-left: auto;
  margin-right: auto;
}

.navbar__logo {
  width: auto;
  max-height: 2rem;
  height: auto;
}

.navbar__menu-separator {
  display: flex;
  flex-grow: 1;
}

.navbar__links {
  display: none;
  gap: 2rem;
  align-items: center;
  height: 100%;
  margin-left: 1rem;
  margin-right: 1rem;
}

@media (min-width: 1024px) {
  .navbar__links {
    display: flex;
  }
}

.navbar__wrapper--mobile {
  display: block;
  width: 100%;
  background-color: $nimvio-white;
}

@media (min-width: 1024px) {
  .navbar__wrapper--mobile {
    display: none;
  }
}

.navbar__links--mobile {
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
