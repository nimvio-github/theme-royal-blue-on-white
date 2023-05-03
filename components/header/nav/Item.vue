<template>
  <div class="navbar__link-wrapper">
    <nuxt-link :to="`${to}`" class="navbar__link">
      {{ text }}
    </nuxt-link>

    <!-- Desktop Subnav-->
    <ul class="navbar__subnav">
      <header-nav-sub-item :nav-childs="navChilds" />
    </ul>

    <!-- Mobile Subnav-->
    <ul class="navbar__subnav__link--mobile">
      <header-nav-sub-item :nav-childs="navChilds" />
    </ul>
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
.navbar__link-wrapper {
  height: 100%;
  position: relative;

  &:hover .navbar__subnav {
    display: block;
  }
}

.navbar__link {
  display: inline-block;
  text-transform: uppercase;
  font-weight: 700;
  height: 100%;

  &::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }

  &::after {
    content: "";
    display: block;
    margin: auto;
    height: 4px;
    width: 0;
    background: transparent;
    transition: all 0.3s;
    position: absolute;
    z-index: 11;
  }

  &:hover,
  &.router-link-active {
    color: var(--nimvio-blue);

    &::after {
      width: 100%;
      background: var(--nimvio-blue);
    }
  }
}

.navbar__subnav {
  display: none;
  z-index: 10;
  position: absolute;
  min-width: 100%;
  width: max-content;
  top: 100%;
  background-color: $nimvio-white;
  border: 1px solid $nimvio-light;
}
</style>
