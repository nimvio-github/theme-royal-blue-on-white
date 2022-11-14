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
import { getContentById } from "~~/utils/dataFetching";
import getFullSlug from "~~/composables/getFullSlug";

// Get the content from Nimvio via ContentID instead of pageSlug
const { contentId } = getFullSlug();

const { data } = await useAsyncData(contentId, async ({ $gqlClient }) => {
  const { data: response } = await getContentById($gqlClient, contentId);

  const pageData = response.Data;
  const layoutId = pageData.layout.ContentIDs[0];
  let layout = null;
  if (layoutId) {
    const { data: content } = await getContentById($gqlClient, layoutId);
    layout = content;
  }

  const widgetIds = pageData.widgetContent.ContentIDs;

  const placeholderIds = layout.Data.placeholders.ContentIDs;
  const placeholders = placeholderIds.map(async (id) => {
    const { data: response } = await getContentById($gqlClient, id);
    return response;
  });

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
});

const { $onPreviewChange } = useNuxtApp();
onMounted(() => {
  $onPreviewChange((formData) => {
    // eslint-disable-next-line no-console
    console.log("onPreviewChange", formData);
    data.value.components = data.value.components.map((component) => {
      if (component.ContentID === formData.id) {
        component.Data = formData.formData;
      }
      return component;
    });
  });
});

useHead({
  title: data.value?.pageData.pageTitle,
});

// const refresh = () => refreshNuxtData("page");
</script>

<script>
export default {
  name: "Home",
};
</script>
