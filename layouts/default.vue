<template>
  <div>
    <NuxtLoadingIndicator
      :duration="10000"
      :color="`repeating-linear-gradient(to right,#e2e8f0 0%,#4169e1 50%,#00008B 100%)`"
    />
    <slot name="empty"></slot>

    <header class="header">
      <slot name="header"> </slot>
    </header>

    <slot name="main"> </slot>

    <footer class="footer">
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : "Nimvio Website";
  },
});
</script>

<script>
export default {
  name: "Default",
};
</script>

<style lang="scss">
@media (min-width: 768px) {
  .footer {
    margin-top: 6rem;
  }
}

.footer {
  margin-top: 3rem;
  color: $nimvio-white;
  background-color: $nimvio-black;
}
</style>
