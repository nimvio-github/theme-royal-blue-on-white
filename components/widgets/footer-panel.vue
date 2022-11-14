<template>
  <div class="container mx-auto" v-bind="webLinkProps">
    <div class="py-8 flex md:flex-row flex-col md:gap-8 gap-4">
      <NuxtLink
        v-for="link in data.policyContents"
        :key="link.text"
        :data-kontent-item-id="link.ContentID"
        :data-kontent-element-codename="link.TemplateName"
        class="font-bold hover:text-light-white"
        :to="`/${link.to}`"
        >{{ link.text }}
      </NuxtLink>
      <div class="flex-grow"></div>
      <div class="flex items-center">
        <icon name="mdi-copyright" class="mr-2" />
        {{ new Date().getFullYear() }} {{ data.copyrightName }}, Last Updated
        {{
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAttrs } from "vue";
import { getContentById } from "~~/utils/dataFetching";

const attrs = useAttrs();

const { datasource } = attrs;
const datasourceId = datasource.ContentIDs[0];

const webLinkProps = {
  "data-kontent-item-id": datasourceId,
  "data-kontent-element-codename": "Footer Panel",
};

const { data } = await useAsyncData("footerPanel", async ({ $gqlClient }) => {
  const { data: response } = await getContentById($gqlClient, datasourceId);
  const policyIds = response.Data.policyContents.ContentIDs || [];
  const policyContents = policyIds.map(async (id) => {
    const { data: policyResponse } = await getContentById($gqlClient, id);
    return {
      text: policyResponse.Data.pageTitle,
      to: policyResponse.Data.pageSlug,
      ...policyResponse,
    };
  });
  return {
    policyContents: await Promise.all(policyContents),
    copyrightName: response.Data.copyrightName,
  };
});
</script>
