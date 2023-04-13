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
      <section class="flex items-center justify-center h-screen">
        <p class="prose text-2xl tracking-tight">
          It looks like you are trying to create a new page? Don't worry your
          new page will be visible right away💪.
          <br />
          <br />
          Don't forget to
          <span class="font-extrabold">Save</span> your content to prevent
          loosing your work 👌. If the preview doesn't seem to work, try to
          click on the <span class="font-extrabold">Refresh</span> button in the
          above toolbar 🤞.
        </p>
      </section>
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

// content: NewContentResponse = Data.value
// id: content.id
// newContent: formData
//
const updateContentById = (content, id, newContent, cache = {}) => {
  if (cache[content?.ContentID]) return null;
  cache[content?.ContentID] = true;

  // cache {
  // xxxx: true
  // }

  if (content?.ContentID === id) {
    content.Data = newContent;
    return content;
  }

  const componentDataKeys = Object.keys(content.Data);

  // componentDataKeys = ["layoutName", "placeholder"]

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
  $nimvioSdk.livePreviewUtils.onPreviewContentChange((content) => {
    // ContentChangeReceivedPayloadData
    // id
    // formData<any>
    // example:
    // formData {
    //  ...formFields
    // }

    const newContent = updateContentById(
      data.value,
      content.id,
      content.formData
    );
    console.log("Data", clone(data));

    console.log("Content change", content);
    if (newContent) {
      console.log("New Content", newContent);

      data.value = transformContent(newContent);

      console.log("New DATA", data.value);
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
