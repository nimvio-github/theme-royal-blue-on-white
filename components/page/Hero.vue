<template>
  <section class="banner-homepage" :style="heroStyle">
    <div
      class="text-center py-28 max-w-2xl px-4 sm:px-6 lg:px-8 mx-auto py-banner-custom max-width-custom"
    >
      <h1
        v-if="props.title"
        class="text-5xl font-extrabold tracking-tight text-royal-blue heading-1 text-blue-custom"
        data-kontent-component-id="title"
        :data-text="props.title"
        v-text="props.title"
      ></h1>
      <div
        v-if="props.description"
        class="mt-8 text-royal-blue paragraph-1 text-blue-custom"
        data-kontent-component-id="description"
        v-html="props.description"
      ></div>
      <div class="mt-8 mt-btn1-custom">
        <common-button-link
          v-if="props.button.text && props.button.to"
          class="btn-orange"
          :to="props.button.to"
          data-kontent-component-id="buttonUrl"
          >{{ props.button.text }}</common-button-link
        >
      </div>
    </div>
  </section>
</template>

<script setup>
const { $img } = useNuxtApp();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  button: {
    type: Object,
    required: true,
  },
  backgroundMedia: {
    type: String,
    required: true,
  },
});

const heroStyle = computed(() => {
  return {
    backgroundImage: `linear-gradient(rgba(175, 175, 0, 0.03), rgba(175, 175, 0, 0.03)), url("${$img(
      props.backgroundMedia
    )}")`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };
});
</script>
