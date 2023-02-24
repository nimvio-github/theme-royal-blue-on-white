<template>
  <div class="flex flex-col gap-4">
    <NuxtLink
      :to="`${to}`"
      class="font-bold text-dark-white hover:text-light-white"
      >{{ text }}</NuxtLink
    >
    <NuxtLink
      v-for="item in navChilds"
      :key="item.text"
      :data-nimvio-content-id="item.ContentID"
      :data-nimvio-template-name="item.TemplateName"
      class="text-dark-white hover:text-light-white hidden md:block"
      :to="`/${item.to}`"
      >{{ item.text }}
    </NuxtLink>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    navChilds: {
      type: Array,
      default: null,
    },
  },
};
</script>
