<template>
  <div>
    <placeholder-renderer
      v-if="placeholders"
      :components="placeholders"
      :page-data="pageData"
      :template-name="templateName"
      :page-components="pageComponents"
    />
    <slot></slot>
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

defineProps({
  placeholders: { type: Array, required: true },
  pageData: { type: Object, required: true },
  templateName: { type: String, default: () => "" },
  pageComponents: { type: Array, default: () => [] },
});
</script>

<script>
export default {
  name: "Default",
};
</script>
