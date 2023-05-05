<template>
  <section :style="heroStyle">
    <div class="homepage__hero">
      <h1
        v-if="props.title"
        data-kontent-component-id="title"
        :data-text="props.title"
        v-text="props.title"
      ></h1>
      <div
        v-if="props.description"
        class="homepage__hero__text"
        data-kontent-component-id="description"
        v-html="props.description"
      ></div>
      <div class="homepage__hero__button">
        <common-button-link
          v-if="props.button.text && props.button.to"
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

<style lang="scss">
.homepage__hero {
  text-align: center;
  padding: 7rem 1rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;

  h1 {
    color: $nimvio-blue;
    letter-spacing: -0.025em;
    font-weight: 800;
    font-size: 3rem;
    line-height: 1;
  }
}

.homepage__hero__text {
  color: $nimvio-blue;
  margin-top: 2rem;
}

.homepage__hero__button {
  margin-top: 2rem;
}

@media (min-width: 640px) {
  .homepage__hero {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .homepage__hero {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
