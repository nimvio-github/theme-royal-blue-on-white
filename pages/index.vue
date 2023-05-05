<template>
  <NuxtLayout :name="data.Data.layoutName ? data.Data.layoutName : 'default'">
    <template v-for="(contents, key) in data?.widgets" #[key]>
      <component-renderer
        :key="key"
        :components="contents"
      ></component-renderer>
    </template>

    <LazyCommonRefetchButton @click="refresh">
      {{ data && !pending ? "Fetch Newest Data" : "Fetching data..." }}
    </LazyCommonRefetchButton>

    <template #empty>
      <CommonEmpty v-if="data" :show-empty="showEmpty" :data="data" />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { getContentByPageSlug } from "~~/utils/dataFetching";
import transformContent from "~~/utils/transformContent";

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

      return transformContent(newResponse);
    }

    const { data: response } = await getContentByPageSlug(
      $gqlClient,
      currentPath,
      {
        deep: true,
      }
    );

    return transformContent(response);
  }
);

const showEmpty = computed(() => {
  const { Data } = data.value;
  return !Data.layoutName && !Data.placeholder && !Data.contentTitle;
});

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

    // Check if it is linked content
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
      data.value = transformContent(newContent);
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

<style lang="scss">
.homepage__section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.section__title {
  color: $nimvio-blue;
  letter-spacing: -0.024em;
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 2.5rem;
  text-align: center;
  padding: 1.5rem;
  margin-top: 1.25rem;
}

.section__listing {
  padding: 1.5rem;
  column-gap: 1rem;
  row-gap: 3rem;
  justify-content: space-around;
  flex-wrap: wrap;
  display: flex;
  margin-top: 3rem;
}
</style>
