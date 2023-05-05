<template>
  <common-card :to="props.to">
    <p class="card__category" data-kontent-component-id="category">
      {{ props.category }}
    </p>
    <div class="card__content">
      <h4 class="card__title" data-kontent-component-id="title">
        {{ props.title }}
      </h4>
    </div>
    <p class="card__info">
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

<style lang="scss">
.card__category {
  text-transform: capitalize;
  font-weight: 700;
}

.card__content {
  height: 100%;
  margin-top: 1.5rem;
}

.card__title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  letter-spacing: -0.025em;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
}

.card__info {
  margin-top: 2rem;
}
</style>
