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
import { useAttrs } from "vue";
import { getContentById } from "~~/utils/dataFetching";

const attrs = useAttrs();

const { datasource } = attrs;
const datasourceId = datasource.ContentIDs[0];

const webLinkProps = {
  "data-kontent-item-id": datasourceId,
  "data-kontent-element-codename": "Header Panel",
};

const { data } = await useAsyncData("headerPanel", async ({ $gqlClient }) => {
  const { data: response } = await getContentById($gqlClient, datasourceId);

  return {
    logo: response.Data.image?.MediaUrl,
    logoAlt: response.Data.image?.AltText,
    description: response.Data.description,
  };
});
</script>
