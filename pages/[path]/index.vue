<template>
  <NuxtLayout
    :name="data.layoutData.layoutName"
    :page-data="data.pageData"
    :placeholders="data.placeholders"
    :template-name="data.templateName"
    :page-components="data.components"
  >
  </NuxtLayout>
</template>

<script setup>
import {
  getContentByPageSlug,
  getMultipleContents,
  getContentById,
} from "~~/utils/dataFetching";

const route = useRoute();
const { data } = await useAsyncData(
  route.params.path,
  async ({ $gqlClient }) => {
    const { data: response } = await getContentByPageSlug(
      $gqlClient,
      route.params.path
    );
    const pageData = response.Data;
    const layoutId = pageData.layout.ContentIDs[0];

    let layout = null;
    if (layoutId) {
      const { data: content } = await getContentById($gqlClient, layoutId);
      layout = content;
    }

    const placeholderIds = layout.Data.placeholders.ContentIDs;
    const placeholders = placeholderIds.map(async (id) => {
      const { data: response } = await getContentById($gqlClient, id);
      return response;
    });

    if (response.TemplateName === "Page Article") {
      return {
        pageData,
        components: [response],
        layoutData: layout ? layout.Data : {},
        placeholders: await Promise.all(placeholders),
        templateName: response.TemplateName,
      };
    }

    if (response.TemplateName === "Page") {
      const widgetIds = pageData.widgetContent.ContentIDs;

      const pageWidgets = widgetIds.map(async (id) => {
        const { data: content } = await getContentById($gqlClient, id);
        return content;
      });

      return {
        pageData,
        components: await Promise.all(pageWidgets),
        layoutData: layout ? layout.Data : {},
        placeholders: await Promise.all(placeholders),
        templateName: response.TemplateName,
      };
    }

    const pageComponentIds = pageData.pageComponents.ContentIDs || [];
    const { data: pageComponents } = await getMultipleContents(
      $gqlClient,
      pageComponentIds
    );
    return {
      pageData,
      components: pageComponents,
    };
  }
);
useHead({
  title: data.value?.pageData.pageTitle,
});
// const refresh = () => refreshNuxtData(route.params.path);
</script>
