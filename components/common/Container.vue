<template>
  <component :is="as" class="container">
    <slot></slot>
  </component>
</template>

<script lang="ts">
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    as: {
      default: "div",
    },
  },
};
</script>
