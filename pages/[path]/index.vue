<template>
  <NuxtLayout :name="data.Data.layoutName ? data.Data.layoutName : 'default'">
    <template v-for="(contents, key) in data.widgets" #[key]>
      <component-renderer
        :key="key"
        :components="contents"
      ></component-renderer>
    </template>

    <LazyCommonRefetchButton @click="refresh">
      {{ data && !pending ? "Fetch Newest Data" : "Fetching data..." }}
    </LazyCommonRefetchButton>
  </NuxtLayout>
</template>

<script setup>
import groupBy from "lodash/groupBy";
import clone from "lodash/clone";
import omit from "lodash/omit";
import uniq from "lodash/uniq";

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

      const widgetContent = newResponse.Data.widgets;
      widgetContent.unshift(omit(clone(newResponse), "Data.widgets"));

      const widgets = groupBy(widgetContent, "Data.placeholder");
      return { ...newResponse, widgets };
    }
    const { data: response } = await getContentByPageSlug(
      $gqlClient,
      currentPath,
      {
        deep: true,
      }
    );

    const widgetContent = response.Data.widgets;
    widgetContent.unshift(omit(clone(response), "Data.widgets"));

    const widgets = groupBy(widgetContent, "Data.placeholder");
    return {
      ...response,
      widgets,
    };
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
      const widgetContent = newContent.Data.widgets;
      widgetContent.unshift(omit(clone(newContent), "Data.widgets"));

      const widgets = groupBy(widgetContent, "Data.placeholder");
      const updatedWidgets = { ...newContent, widgets: uniq(widgets) };

      data.value = updatedWidgets;
    }
  });
});

useHead({
  title: data.value?.Data.pageTitle,
});
</script>
