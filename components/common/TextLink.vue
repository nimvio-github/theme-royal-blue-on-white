<template>
  <NuxtLink class="text-link">
    <slot></slot>
  </NuxtLink>
</template>

<style lang="scss">
.text-link {
  color: $nimvio-blue;
  &:hover {
    color: $nimvio-dark-blue;
  }
}
</style>
