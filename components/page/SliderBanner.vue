<template>
  <Splide :data-splide="sliderOptions" aria-labelledby="basic-example-heading">
    <SplideSlide v-for="component in props.contents" :key="component.ContentID">
      <PageHero v-bind="getComponentProps(component)"></PageHero>
    </SplideSlide>
  </Splide>
</template>

<script setup>
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

const getComponentProps = (componentData) => {
  const webLinkProps = {
    "data-nimvio-content-id": componentData.ContentID,
    "data-nimvio-template-name": componentData.TemplateName,
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
