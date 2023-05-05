<template>
  <div class="container footer-bar">
    <div class="footer-bar__links">
      <NuxtLink to="/">
        <h5 class="footer-bar__link-home">{{ props.title }}</h5>
      </NuxtLink>
      <div class="footer-bar__link-separator"></div>
      <div class="footer-bar__links-social-media">
        <common-icon-link
          v-for="social in props.socialLinks"
          :key="social.ContentID"
          :icon-name="social.Data.type.toLowerCase()"
          :data-nimvio-content-id="social.ContentID"
          :data-nimvio-template-name="social.TemplateName"
          icon-size="1.5em"
          :to="social.Data.link"
          target="_blank"
          class="footer-bar__link-social-media"
          :aria-label="social.Data.type.toLowerCase()"
        />
      </div>
    </div>

    <div class="footer-bar__navs">
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

<style lang="scss">
.footer-bar {
  padding-top: 2rem;
  padding-bottom: 2rem;

  .footer-bar__links {
    display: flex;
    flex-direction: column;
  }

  .footer-bar__link-home {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .footer-bar__link-separator {
    flex-grow: 1;
  }

  .footer-bar__links-social-media {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-left: -0.75rem;
    margin-right: -0.75rem;
  }

  .footer-bar__link-social-media {
    padding: 0.75rem;
    color: $nimvio-white;
  }

  .footer-bar__navs {
    display: grid;
    margin-top: 2rem;
    gap: 1rem;
    grid-auto-rows: minmax(0, 1fr);
  }
}

@media (min-width: 768px) {
  .footer-bar {
    .footer-bar__links {
      flex-direction: row;
    }

    .footer-bar__navs {
      gap: 2rem;
      grid-auto-flow: column;
      grid-auto-columns: minmax(0, 1fr);
    }
  }
}
</style>
