<template>
  <NuxtLink class="btn-link" role="button">
    <slot></slot>
  </NuxtLink>
</template>

<style lang="scss">
.btn-link {
  padding: 1.5rem 0.5rem;
  background-color: $nimvio-blue;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0.125rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0.125rem;
  padding: 0.5rem 1.5rem;
  display: inline;
  height: 100%;
  color: $nimvio-white;
}
</style>
