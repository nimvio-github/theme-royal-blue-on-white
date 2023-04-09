<template>
  <NuxtLayout v-if="data" :name="data ? data.Data.layoutName : 'default'">
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
import { getContentByPageSlug } from "~~/utils/dataFetching";
import { addGroupWidgets2Content } from "~~/utils/addWidgets";

const route = useRoute();
const currentPath = route.path === "/" ? "/home" : route.path;

const { data, refresh, pending } = await useAsyncData(
  route.path,
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

      return addGroupWidgets2Content(newResponse);
    }

    const { data: response } = await getContentByPageSlug(
      $gqlClient,
      currentPath,
      {
        deep: true,
      }
    );

    return addGroupWidgets2Content(response);
  }
);

const updateContentById = (content, id, newContent, cache = {}) => {
  if (cache[content?.ContentID]) return null;
  cache[content?.ContentID] = true;
  if (content?.ContentID === id) {
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
      data.value = addGroupWidgets2Content(newContent);
    }
  });
});

useHead({
  title: data.value?.Data.pageTitle,
});
</script>

<script>
export default {
  name: "Home",
};
</script>
