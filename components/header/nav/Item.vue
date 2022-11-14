<template>
  <div
    class="h-full relative"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <nuxt-link
      :to="`/${to}`"
      class="uppercase hover:text-royal-blue active:text-royal-blue font-bold h-full flex items-center text-blue-custom paragraph-2 hover-anchor-custom"
    >
      {{ text }}
    </nuxt-link>
    <!-- Desktop -->
    <div
      v-if="hover || currentRoute === to"
      class="h-1 bg-blue-600 absolute w-full bottom-1 hidden lg:block"
    ></div>
    <div
      v-if="hover && navChilds && navChilds.length"
      class="hidden lg:flex z-10 absolute min-w-full w-max top-full flex-col gap-4 p-6 shadow-lg bg-white border"
    >
      <nuxt-link
        v-for="item in navChilds"
        :key="item.text"
        :data-kontent-item-id="item.ContentID"
        :data-kontent-element-codename="item.TemplateName"
        :to="`/${item.to}`"
        class="hover:text-royal-blue active:text-royal-blue text-blue-custom paragraph-3 hover-anchor-custom"
        >{{ item.text }}</nuxt-link
      >
    </div>
    <!-- Mobile -->
    <div class="flex flex-col ml-4 mt-4 gap-4 lg:hidden">
      <nuxt-link
        v-for="item in navChilds"
        :key="item.text"
        :data-kontent-item-id="item.ContentID"
        :data-kontent-element-codename="item.TemplateName"
        :to="`/${item.to}`"
        class="hover:text-royal-blue active:text-royal-blue text-blue-custom paragraph-3 hover-anchor-custom"
        >{{ item.text }}</nuxt-link
      >
    </div>
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
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    currentRoute() {
      return this.$route.params.path;
    },
  },
};
</script>
