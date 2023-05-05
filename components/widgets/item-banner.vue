<template>
  <hr />
  <section class="homepage__section container" v-bind="$attrs">
    <div class="homepage__section__grid">
      <div
        class="homepage__section__detail"
        :class="props.reversed ? 'homepage__section__detail--order-last' : ''"
        data-kontent-component-id="type"
      >
        <p
          v-if="props.tag"
          class="homepage__section__detail__tag"
          data-kontent-component-id="tag"
        >
          {{ props.tag }}
        </p>
        <h2
          data-kontent-component-id="title"
          class="homepage__section__detail__title"
        >
          {{ props.title }}
        </h2>
        <div
          class="homepage__section__detail__desc"
          data-kontent-component-id="description"
          v-html="props.description"
        ></div>
        <div v-if="props.link" class="homepage__section__detail__link">
          <common-text-link
            :to="props.link.url"
            data-kontent-component-id="linkText"
            >{{ props.link.text }}</common-text-link
          >
        </div>
      </div>

      <div class="homepage__section__image">
        <div
          class="homepage__section__image--background"
          data-kontent-component-id="media"
          :style="{ 'background-image': `url(${media.url})` }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    required: false,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: Object,
    default: null,
  },
  media: {
    type: Object,
    required: true,
  },
  reversed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.homepage__section {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.homepage__section__grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.homepage__section__detail {
  padding: 1.5rem;
  max-width: 36rem;
}

.homepage__section__detail__tag {
  text-transform: uppercase;
  margin-top: 1.5rem;
}

.homepage__section__detail__title {
  color: $nimvio-blue;
  letter-spacing: -0.025em;
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-top: 1.25rem;
}

.homepage__section__detail__desc {
  margin-top: 1.25rem;
}

.homepage__section__detail__link {
  margin-top: 1.25rem;
}

.homepage__section__image {
  display: flex;
  padding: 1.5rem;
  justify-content: center;
  align-items: center;
}

.homepage__section__image--background {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 100%;
}

@media (min-width: 768px) {
  .homepage__section {
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .homepage__section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .homepage__section__detail--order-last {
    order: 9999;
  }
}

@media (min-width: 1024px) {
  .homepage__section {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

@media (min-width: 1280px) {
  .homepage__section {
    padding-top: 3rem;
    padding-bottom: 3rem;
    margin-bottom: 2rem;
  }
}
</style>
