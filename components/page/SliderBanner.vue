<template>
  <Splide :data-splide="sliderOptions" aria-labelledby="basic-example-heading">
    <SplideSlide v-for="component in components" :key="component.ContentID">
      <PageHero v-bind="getComponentProps(component)"></PageHero>
    </SplideSlide>
  </Splide>
</template>

<script setup>
import { getMultipleContents } from "~~/utils/dataFetching";

const props = defineProps({
  contents: {
    type: Array,
    required: true,
  },
  sliderOptions: {
    type: String,
    default: "",
  },
});

const route = useRoute();

// Fetch Contents Data
const { data: components } = await useAsyncData(
  `sliderBanner-${route.fullPath}`,
  async ({ $gqlClient }) => {
    const { data: pageComponents } = await getMultipleContents(
      $gqlClient,
      props.contents
    );
    return pageComponents;
  }
);

const getComponentProps = (componentData) => {
  const webLinkProps = {
    "data-kontent-item-id": componentData.ContentID,
    "data-kontent-element-codename": componentData.TemplateName,
    class: "h-full",
  };
  return {
    ...webLinkProps,
    title: componentData.Data.title,
    description: componentData.Data.description,
    button: {
      text: componentData.Data.buttonText,
      to: componentData.Data.buttonUrl,
    },
    backgroundMedia: componentData.Data.backgroundMedia?.MediaUrl,
  };
};
</script>
