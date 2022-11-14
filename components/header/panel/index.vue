<template>
  <section class="h-8 bg-light-gray" v-bind="webLinkProps">
    <div class="container mx-auto h-full flex items-center">
      <nuxt-img
        :src="data.logo"
        :alt="data.logoAlt || 'panel-logo'"
        width="16"
        height="16"
      />
      <div class="pl-2 text-dark-gray" v-html="data.description"></div>
    </div>
  </section>
</template>

<script setup>
// import config from "~~/helpers/config";
import { getContentById } from "~~/utils/dataFetching";

const { public: config } = useRuntimeConfig();

const webLinkProps = {
  "data-kontent-item-id": config.header.panelContentId,
  "data-kontent-element-codename": "Header Panel",
};

const { data } = await useAsyncData("headerPanel", async ({ $gqlClient }) => {
  const { data: response } = await getContentById(
    $gqlClient,
    config.header.panelContentId
  );
  return {
    logo: response.Data.image?.MediaUrl,
    logoAlt: response.Data.image?.AltText,
    description: response.Data.description,
  };
});
</script>
