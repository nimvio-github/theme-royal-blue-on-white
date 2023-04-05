<template>
  <hr />
  <section
    class="py-2 md:py-4 lg:py-8 xl:py-12 mb-2 md:mb-4 lg:md-6 xl:mb-8 pb-section-custom mb-section-custom"
    v-bind="$attrs"
  >
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        class="p-6 max-w-xl custom-banner-order"
        :class="props.reversed ? 'order-first md:order-last' : ''"
        data-kontent-component-id="type"
      >
        <p
          v-if="props.tag"
          class="mt-6 text-green-custom uppercase text-green-custom"
          data-kontent-component-id="tag"
        >
          {{ props.tag }}
        </p>
        <h2
          data-kontent-component-id="title"
          class="text-4xl font-bold tracking-tight text-royal-blue mt-5 heading-2 text-blue-custom"
        >
          {{ props.title }}
        </h2>
        <div
          class="mt-5 paragraph-1"
          data-kontent-component-id="description"
          v-html="props.description"
        ></div>
        <div v-if="props.link" class="mt-5 mt-btn2-custom">
          <common-text-link
            class="btn-orange"
            :to="props.link.url"
            data-kontent-component-id="linkText"
            >{{ props.link.text }}</common-text-link
          >
        </div>
      </div>
      <div class="flex items-center justify-center p-6 dot-bg-left">
        <!-- <nuxt-img
          data-kontent-component-id="media"
          :src="media.url"
          :alt="media.alt"
          width="496"
          height="240"
          format="webp"
          fit="inside"
        /> -->
        <div
          class="h-full w-full bg-center bg-no-repeat bg-contain peach-bg peach-bg-1"
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
