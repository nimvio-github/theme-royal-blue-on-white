<template>
  <div>
    <NuxtLoadingIndicator
      :duration="10000"
      :color="`repeating-linear-gradient(to right,#e2e8f0 0%,#4169e1 50%,#00008B 100%)`"
    />
    <header class="header">
      <slot name="header">
        <component-renderer v-if="headerWidgets" :components="headerWidgets" />
      </slot>
    </header>

    <slot name="main"> </slot>

    <footer
      class="bg-dark-gray text-dark-white mt-12 md:mt-24 footer-bg-custom"
    >
      <slot name="footer">
        <component-renderer v-if="footerWidgets" :components="footerWidgets" />
      </slot>
    </footer>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Nimvio Demo Website`
      : "Nimvio Demo Website";
  },
});

const props = defineProps({
  placeholders: { type: Array, required: true },
});

function getWidgets(placeholderName) {
  if (props.placeholders) {
    const placeholder = props.placeholders.filter(
      (placeholder) => placeholder.Name === placeholderName
    );

    const placeholderData = placeholder[0].Data;
    return placeholderData.widgets;
  } else {
    return undefined;
  }
}

const headerWidgets = getWidgets("HeaderPlaceholder");
const footerWidgets = getWidgets("FooterPlaceholder");
</script>

<script>
export default {
  name: "Default",
};
</script>
