<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="bg-royal-blue text-light-white hover:bg-dark-blue transition-colors"
  >
    <slot></slot>
  </NuxtLink>
  <div v-else class="bg-royal-blue text-light-white">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: "",
    },
  },
};
</script>
