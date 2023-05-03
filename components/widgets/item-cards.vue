<template>
  <hr />
  <section class="homepage__section container" v-bind="$attrs">
    <h2 class="section__title" data-kontent-component-id="title">
      {{ title }}
    </h2>

    <div class="section__listing" data-kontent-component-id="dataSource">
      <div
        v-for="component in props.contents"
        :key="component.ContentID"
        :data-nimvio-content-id="component.ContentID"
        :data-nimvio-template-name="component.TemplateName"
        class="fature-card"
      >
        <div
          class="feature-card__image"
          :style="`background-image: url('${$img(
            component.Data.media.MediaUrl
          )}')`"
          data-kontent-component-id="media"
        ></div>
        <common-card class="feature-card__image--hidden">
          <img
            :src="$img(component.Data.media.MediaUrl)"
            width="100"
            height="105"
            alt="key benefit image"
          />
          <h2
            class="feature-card__image__title"
            data-kontent-component-id="title"
          >
            {{ component.Data.title }}
          </h2>
          <div
            class="feature-card__image__desc"
            data-kontent-component-id="description"
            v-html="component.Data.description"
          ></div>
        </common-card>
      </div>
    </div>
  </section>
  <hr />
</template>

<script setup>
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
</script>

<style lang="scss">
.fature-card {
  width: 20rem;
  border: 1px solid $nimvio-gray;
}

.feature-card__image {
  background-size: 75%;
  background-repeat: no-repeat;
  background-position: center;
  height: 20rem;
}

.feature-card__image--hidden {
  img {
    display: none;
  }
}

.feature-card__image__title {
  letter-spacing: -0.025em;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
}

.feature-card__image__desc {
  margin-top: 1.25rem;
}
</style>
