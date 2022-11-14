<template>
  <section class="py-12">
    <div class="container mx-auto">
      <h2
        class="p-6 text-4xl font-bold tracking-tight text-royal-blue mt-5 text-center heading-2 text-blue-custom lg-align-left-custom"
        data-kontent-component-id="sectionTitle"
      >
        {{ props.title }}
      </h2>
      <div
        data-kontent-component-id="articles"
        class="p-6 flex flex-wrap justify-around mt-12 gap-y-12 gap-x-4"
      >
        <page-article-card
          v-for="component in components"
          :key="component.ContentID"
          :data-kontent-element-codename="component.TemplateName"
          :data-kontent-item-id="component.ContentID"
          :to="`${link}/${component.Data.pageSlug}`"
          :category="component.Data.category"
          :title="component.Data.pageTitle"
          :published-at="component.PublishedAt"
        >
        </page-article-card>
      </div>
      <div v-if="components && components.length" class="mt-8 text-center">
        <common-text-link
          data-kontent-component-id="link"
          :to="link"
          class="btn-white-orange"
          >Read More</common-text-link
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { getMultipleContents } from "~~/utils/dataFetching";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  contents: {
    type: Array,
    required: true,
  },
});

const route = useRoute();

// Fetch Contents Data
const { data: components } = await useAsyncData(
  `articleCards-${route.fullPath}`,
  async ({ $gqlClient }) => {
    const { data: pageComponents } = await getMultipleContents(
      $gqlClient,
      props.contents
    );
    return pageComponents;
  }
);
</script>
