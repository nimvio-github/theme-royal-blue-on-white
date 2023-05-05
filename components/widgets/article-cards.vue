<template>
  <section class="homepage__section container">
    <h2
      class="section__title"
      data-kontent-component-id="sectionTitle"
      data-text="Want More?"
    >
      {{ props.title }}
    </h2>

    <div data-kontent-component-id="articles" class="section__listing">
      <page-article-card
        v-for="component in props.contents"
        :key="component.ContentID"
        :data-nimvio-template-name="component.TemplateName"
        :data-nimvio-content-id="component.ContentID"
        :to="`${link}/${component.Data.pageSlug}`"
        :category="component.Data.category"
        :title="component.Data.pageTitle"
        :published-at="component.PublishedAt"
      >
      </page-article-card>
    </div>

    <div
      v-if="props.contents && props.contents.length"
      class="listing__read-more"
    >
      <common-text-link data-kontent-component-id="link" :to="link">
        Read More
      </common-text-link>
    </div>
  </section>
</template>

<script setup>
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
</script>

<style lang="scss">
.listing__read-more {
  text-align: center;
  margin-top: 2rem;
}
</style>
