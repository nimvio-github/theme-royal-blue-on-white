<template>
  <NuxtLayout
    :name="data.Data.layout[0].Data.layoutName"
    :placeholders="data.Data.layout[0].Data.placeholders"
  >
    <template #main>
      <common-breadcrumb />
      <LazyCommonRefetchButton @click="refresh">
        {{ data && !pending ? "Fetch Newest Data" : "Fetching data..." }}
      </LazyCommonRefetchButton>
      <!-- content for the main slot -->
      <component-renderer
        v-if="data.TemplateName === 'Page Article'"
        :components="[data]"
      ></component-renderer>
      <component-renderer
        v-else-if="
          data.TemplateName !== 'Page Article' && data.Data.widgetContent
        "
        :components="data.Data.widgetContent"
      ></component-renderer>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { getContentByPageSlug, getContentById } from "~~/utils/dataFetching";

const route = useRoute();
const currentPath = route.path;

const { data, refresh, pending } = await useAsyncData(
  currentPath,
  async ({ $gqlClient }) => {
    // If it is inside the iframe (has isNewPage and contentId query), fetch using contentId
    if (route.query.isNewPage === "true" && route.query.contentId) {
      const { data: newResponse } = await getContentById(
        $gqlClient,
        route.query.contentId,
        {
          deep: true,
        }
      );
      return newResponse;
    }
    const { data: response } = await getContentByPageSlug(
      $gqlClient,
      currentPath,
      {
        deep: true,
      }
    );
    return response;
  }
);

const updateContentById = (content, id, newContent, cache = {}) => {
  if (cache[content.ContentID]) return null;
  cache[content.ContentID] = true;
  if (content.ContentID === id) {
    content.Data = newContent;
    return content;
  }
  const componentDataKeys = Object.keys(content.Data);
  for (let i = 0; i < componentDataKeys.length; i++) {
    const componentDataKey = componentDataKeys[i];
    if (Array.isArray(content.Data[componentDataKey])) {
      for (let j = 0; j < content.Data[componentDataKey].length; j++) {
        const found = updateContentById(
          content.Data[componentDataKey][j],
          id,
          newContent,
          cache
        );
        if (found) {
          content.Data[componentDataKey][j] = found;
        }
      }
    }
  }
  return content;
};

const { $nimvioSdk } = useNuxtApp();
onBeforeMount(() => {
  $nimvioSdk.livePreviewUtils.onPreviewContentChange((formData) => {
    const newContent = updateContentById(
      data.value,
      formData.id,
      formData.formData
    );
    if (newContent) {
      data.value = newContent;
    }
  });
});

useHead({
  title: data.value?.Data.pageTitle,
});
</script>
