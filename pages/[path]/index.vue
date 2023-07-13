<template>
  <NuxtLayout :name="data.Data.layoutName ? data.Data.layoutName : 'default'">
    <template v-for="(contents, key) in data?.widgets" #[key]>
      <component-renderer
        :key="key"
        :components="contents"
      ></component-renderer>
    </template>

    <template #empty>
      <CommonEmpty v-if="data" :show-empty="showEmpty" :data="data" />
    </template>

    <CommonSyncOverlay v-if="showSyncOverlay" />
  </NuxtLayout>
</template>

<script setup>
import { getContentByPageSlug, getContentById } from "~~/utils/dataFetching";
import transformContent from "~~/utils/transformContent";

const route = useRoute();
const currentPath = route.path;
const resetData = ref(false);

const { data, refresh } = await useAsyncData(
  currentPath,
  async ({ $gqlClient }) => {
    // If it is inside the iframe (has isNewPage and contentId query), fetch using contentId
    if (route.query.isNewPage === "true" && route.query.contentId) {
      const { data: newResponse } = await getContentById(
        $gqlClient,
        route.query.contentId,
        {
          deep: true,
        },
        resetData
      );

      return transformContent(newResponse);
    }
    const { data: response } = await getContentByPageSlug(
      $gqlClient,
      currentPath,
      {
        deep: true,
      },
      resetData
    );

    return transformContent(response);
  }
);

const showEmpty = computed(() => {
  const { Data } = data.value;
  return !Data.layoutName && !Data.placeholder && !Data.contentTitle;
});

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

// get latest saved content from preview api
const showSyncOverlay = ref(false);
const config = useRuntimeConfig();
const { PREVIEW_API_URL, projectId } = config.public;
const { $gqlClient } = useNuxtApp();
const endpoint = `${PREVIEW_API_URL}/${projectId}`;
const syncContent = async () => {
  if (showSyncOverlay.value === false) {
    showSyncOverlay.value = true;
    $gqlClient.setEndpoint(endpoint);
    resetData.value = true;
    await refresh();
    showSyncOverlay.value = false;
  }
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
      data.value = transformContent(newContent);
    }
  });

  $nimvioSdk.livePreviewUtils.onSyncPreviewContent(() => {
    syncContent();
  });
});

useHead({
  title: data.value?.Data.pageTitle,
});
</script>
