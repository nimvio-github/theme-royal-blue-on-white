<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <section class="homepage__section container">
    <!-- Filters -->
    <div class="article__listing__filters">
      <div class="article__listing__categories__filter">
        <nuxt-link
          class="article__listing__category"
          :class="
            state.selectedCategory === 'All' &&
            'article__listing__category--selected'
          "
          @click="state.selectedCategory = 'All'"
          >All</nuxt-link
        >
        <nuxt-link
          v-for="category in allCategories"
          :key="category"
          class="article__listing__category"
          :class="
            state.selectedCategory === category &&
            'article__listing__category--selected'
          "
          @click="state.selectedCategory = category"
          >{{ category }}</nuxt-link
        >
      </div>
      <div class="article__listing__filter__separator"></div>
      <div class="article__listing__dropdown__filter">
        <label class="article__listing__dropdown__label" for="period">
          <icon name="mdi-chevron-down" size="2rem" />
        </label>
        <select
          id="period"
          v-model="state.selectedSort"
          class="article__listing__dropdown__select"
        >
          <option value="Latest">Latest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
    </div>

    <!-- Article Cards -->
    <div class="article__grid" data-kontent-component-id="datasource">
      <page-article-card
        v-for="component in paginate.contents"
        :key="component.ContentID"
        :data-nimvio-template-name="component.TemplateName"
        :data-nimvio-content-id="component.ContentID"
        :to="`${route.path}/${component.Data.pageSlug}`"
        :category="component.Data.category"
        :title="component.Data.pageTitle"
        :published-at="component.PublishedAt"
      >
      </page-article-card>
    </div>
    <!-- Pagination -->
    <common-pagination
      v-model:page="state.page"
      :page-size="state.pageSize"
      :total-pages="paginate.totalPages"
    />
  </section>
</template>

<script setup>
import { getChildPages } from "~~/utils/dataFetching";

const props = defineProps({
  datasource: {
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
    const pageComponents = props.datasource.map(async (source) => {
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

<style lang="scss">
.article__listing__filters {
  gap: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.article__listing__categories__filter {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  overflow-x: auto;
  gap: 2rem;
  align-items: center;
  max-width: 100%;
  display: flex;
}

.article__listing__category {
  color: $nimvio-black;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
  cursor: pointer;

  &:hover {
    color: $nimvio-blue;
  }
}

.article__listing__category--selected {
  color: $nimvio-blue;
}

.article__listing__filter__separator {
  flex-grow: 1;
}

.article__listing__dropdown__filter {
  position: relative;
  width: 100%;
}

.article__listing__dropdown__label {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  pointer-events: none;
}

.article__listing__dropdown__select {
  font-size: 1.125rem;
  line-height: 1.75rem;
  padding: 0.5rem;
  border: 1px solid $nimvio-gray;
  width: 100%;
  display: block;
  appearance: none;
}

.article__grid {
  display: grid;
  padding-top: 3rem;
  padding-bottom: 3rem;
  gap: 1.5rem;
  justify-content: center;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 640px) {
  .article__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .article__listing__filters {
    flex-direction: row;
  }

  .article__listing__dropdown__filter {
    width: auto;
  }

  .article__listing__dropdown__select {
    width: 16rem;
  }
}

@media (min-width: 1024px) {
  .article__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .article__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
