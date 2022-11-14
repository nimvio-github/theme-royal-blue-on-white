<template>
  <hr />
  <section class="py-12" v-bind="$attrs">
    <div class="container mx-auto">
      <h2
        class="p-6 text-4xl font-bold tracking-tight text-royal-blue mt-5 text-center heading-2 text-blue-custom"
        data-kontent-component-id="title"
      >
        {{ title }}
      </h2>
    </div>
    <div class="masking-banner-key-custom">
      <div class="peach-banner-key-custom"></div>
      <div class="container mx-auto">
        <div
          class="p-6 flex flex-wrap justify-around mt-12 gap-y-12 gap-x-4 mt-card-custom position-top-card-custom"
          data-kontent-component-id="dataSource"
        >
          <div
            v-for="component in components"
            :key="component.ContentID"
            :data-kontent-item-id="component.ContentID"
            :data-kontent-element-codename="component.TemplateName"
            class="w-80 white-card-custom"
          >
            <div
              class="h-80 bg-cover bg-no-repeat bg-center custom-card-hidden"
              :style="`background-image: url('${$img(
                component.Data.media.MediaUrl
              )}')`"
              data-kontent-component-id="media"
            ></div>
            <common-card class="p-4 white-bg-center-custom">
              <img
                :src="$img(component.Data.media.MediaUrl)"
                width="100"
                height="105"
                alt="key benefit image"
                class="hidden custom-card-show"
              />
              <h2
                class="text-2xl font-bold tracking-tight heading-2 text-blue-custom custom-card"
                data-kontent-component-id="title"
              >
                {{ component.Data.title }}
              </h2>
              <div
                class="mt-5 paragraph-1 text-blue-custom"
                data-kontent-component-id="description"
                v-html="component.Data.description"
              ></div>
            </common-card>
          </div>
        </div>
      </div>
    </div>
  </section>
  <hr />
</template>

<script setup>
import { getMultipleContents } from "~~/utils/dataFetching";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: Array,
    required: true,
  },
});

const { $img } = useNuxtApp();
const route = useRoute();

// Fetch Contents Data
const { data: components } = await useAsyncData(
  `itemCards-${route.fullPath}`,
  async ({ $gqlClient }) => {
    const { data: pageComponents } = await getMultipleContents(
      $gqlClient,
      props.contents
    );
    return pageComponents;
  }
);
</script>
