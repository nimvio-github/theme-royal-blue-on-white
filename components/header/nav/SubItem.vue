<template>
  <li v-for="item in navChilds" :key="item.text" class="navbar__subnav__link">
    <nuxt-link
      :data-nimvio-item-id="item.ContentID"
      :data-nimvio-element-codename="item.TemplateName"
      :to="`/${item.to}`"
    >
      {{ item.text }}
    </nuxt-link>
  </li>
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
    navChilds: {
      type: Array as PropType<Array<NavItem>>,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.navbar__subnav__link {
  margin: 0.5rem;

  &:hover {
    color: var(--nimvio-blue);
  }
}

@media (min-width: 1024px) {
  .navbar__subnav__link--mobile {
    display: none;
  }
}
</style>
