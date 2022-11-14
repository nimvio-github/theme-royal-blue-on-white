<template>
  <common-card
    class="p-4 w-full max-w-xs min-h-[320px] flex flex-col justify-around news-card-custom news-card-custom-1"
    :to="props.to"
  >
    <p
      class="font-bold capitalize tag-white z-index-news-custom"
      data-kontent-component-id="category"
    >
      {{ props.category }}
    </p>
    <div class="mt-6 h-full mt-news-custom z-index-news-custom">
      <h4
        class="text-2xl font-bold tracking-tight line-clamp-4 heading-4"
        data-kontent-component-id="title"
      >
        {{ props.title }}
      </h4>
    </div>
    <p class="mt-8 bottom-news-custom z-index-news-custom">
      {{
        new Date(props.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}
    </p>
  </common-card>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
});
</script>
