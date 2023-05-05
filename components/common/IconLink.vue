<template>
  <NuxtLink class="icon-link">
    <icon :name="`mdi:${iconName}`" :size="iconSize" />
  </NuxtLink>
</template>

<script lang="ts">
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    iconSize: {
      type: String,
      default: "2em",
    },
  },
};
</script>

<style lang="scss">
.icon-link {
  display: flex;
  align-items: center;
}
</style>
