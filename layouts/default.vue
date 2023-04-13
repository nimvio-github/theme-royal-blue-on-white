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

    <footer
      class="bg-dark-gray text-dark-white mt-12 md:mt-24 footer-bg-custom"
    >
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
