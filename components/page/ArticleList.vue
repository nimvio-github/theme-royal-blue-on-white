<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <section class="py-6">
    <div class="container mx-auto">
      <!-- Filters -->
      <div class="flex items-center md:flex-row flex-col gap-2">
        <div class="flex gap-8 items-center overflow-x-auto max-w-full py-2">
          <nuxt-link
            class="cursor-pointer uppercase text-lg hover:text-royal-blue font-bold text-dark-gray"
            :class="state.selectedCategory === 'All' && 'text-royal-blue'"
            @click="state.selectedCategory = 'All'"
            >All</nuxt-link
          >
          <nuxt-link
            v-for="category in allCategories"
            :key="category"
            class="cursor-pointer uppercase text-lg hover:text-royal-blue font-bold text-dark-gray"
            :class="state.selectedCategory === category && 'text-royal-blue'"
            @click="state.selectedCategory = category"
            >{{ category }}</nuxt-link
          >
        </div>
        <div class="flex-grow"></div>
        <div class="relative md:w-auto w-full">
          <label
            class="absolute right-2 top-2 pointer-events-none"
            for="period"
          >
            <icon name="mdi-chevron-down" size="2rem" />
          </label>
          <select
            id="period"
            v-model="state.selectedSort"
            class="block md:w-64 w-full p-2 border text-lg border-gray-300 appearance-none"
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>
      <!-- Article Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12 gap-6 justify-center"
        data-kontent-component-id="dataSource"
      >
        <page-article-card
          v-for="component in paginate.contents"
          :key="component.ContentID"
          :data-nimvio-template-name="component.TemplateName"
          :data-nimvio-content-id="component.ContentID"
          :to="`${route.path}/${component.Data.pageSlug}`"
          :category="component.Data.category"
          :title="component.Data.pageTitle"
          :published-at="component.PublishedAt"
          class="mx-auto"
        >
        </page-article-card>
      </div>
      <!-- Pagination -->
      <common-pagination
        v-model:page="state.page"
        :page-size="state.pageSize"
        :total-pages="paginate.totalPages"
      />
    </div>
  </section>
</template>

<script setup>
import { getChildPages } from "~~/utils/dataFetching";

const props = defineProps({
  dataSource: {
    type: Array,
    required: true,
  },
});

const route = useRoute();

// Fetch Contents Data
const { data } = await useAsyncData(
  `articleList-${route.path}`,
  async ({ $gqlClient }) => {
    let contents = [];
    const pageComponents = props.dataSource.map(async (source) => {
      const { data: componentData } = await getChildPages(
        $gqlClient,
        source.ContentID
      );
      contents = contents.concat(componentData);
      return componentData;
    });
    await Promise.all(pageComponents);
    return contents;
  }
);

const { $nimvioSdk } = useNuxtApp();
onBeforeMount(() => {
  $nimvioSdk.livePreviewUtils.onPreviewContentChange((formData) => {
    state.contents = state.contents.map((item) => {
      if (item.ContentID === formData.id) {
        item.Data = formData.formData;
      }
      return item;
    });
  });
});

const state = reactive({
  selectedCategory: "All",
  selectedSort: "Latest",
  contents: (data && data.value) || [],
  page: 1,
  pageSize: 12,
});

// Getting allCategories from the retrieved data
const allCategories = computed(() => {
  const categories = [];
  if (data && data.value) {
    data.value.forEach((content) => {
      const category = content.Data.category;
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
  }
  return categories;
});

// Handle pagination
const paginate = computed(() => {
  const pageSize = state.pageSize;
  const startIdx = pageSize * (state.page - 1);
  const contents = [...state.contents].splice(startIdx, pageSize);
  const totalPages = Math.max(Math.ceil(state.contents.length / pageSize), 1);
  return {
    contents,
    totalPages,
  };
});

// Set contents after data has been retrieved
watch(data, ({ value }) => {
  if (value && value.length) {
    state.contents = [...value];
  }
});

const sortContents = (a, b) => {
  if (state.selectedSort === "Oldest") {
    return new Date(a.PublishedAt) - new Date(b.PublishedAt);
  } else {
    return new Date(b.PublishedAt) - new Date(a.PublishedAt);
  }
};

// Handle category changes
watch(
  () => state.selectedCategory,
  (value) => {
    // Keep the Content's sort
    if (value === "All") {
      state.contents = [...data.value].sort(sortContents);
    } else {
      state.contents = data.value
        .filter((content) => content.Data.category === value)
        .sort(sortContents);
    }
  }
);

// Handle sort changes
watch(
  () => state.selectedSort,
  () => {
    state.contents = [...state.contents].sort(sortContents);
  }
);
</script>
