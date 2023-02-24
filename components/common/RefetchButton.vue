<template>
  <ClientOnly>
    <button v-bind="$attrs" class="refetch-button">
      <slot></slot>
    </button>
  </ClientOnly>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.refetch-button {
  padding: 8px;
  border-radius: 5px;
  border: 1px black solid;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: white;
}
</style>
