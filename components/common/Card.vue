<template>
  <NuxtLink v-if="to" :to="to" class="card">
    <slot></slot>
  </NuxtLink>
  <div v-else class="card-alt">
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

<style lang="scss">
.card {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  color: $nimvio-white;
  padding: 1rem;
  background-color: $nimvio-blue;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  max-width: 20rem;
  width: 100%;
  min-height: 320px;

  &:hover {
    background-color: $nimvio-dark-blue;
  }

  a {
    text-decoration: inherit;
  }
}

.card-alt {
  color: $nimvio-white;
  padding: 1rem;
  background-color: $nimvio-blue;
}
</style>
