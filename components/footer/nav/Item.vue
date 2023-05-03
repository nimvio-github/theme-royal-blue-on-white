<template>
  <div class="footer-bar__nav">
    <NuxtLink :to="`/${to}`">{{ text }}</NuxtLink>

    <NuxtLink
      v-for="item in navChilds"
      :key="item.text"
      :data-nimvio-content-id="item.ContentID"
      :data-nimvio-template-name="item.TemplateName"
      :to="`/${item.to}`"
      >{{ item.text }}
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";

interface NavItem {
  text: string;
  ContentID: string;
  TemplateName: string;
  to: string;
}

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
      type: Array as PropType<Array<NavItem>>,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.footer-bar__nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    font-weight: 700;
  }
}
</style>
