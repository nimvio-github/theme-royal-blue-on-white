<template>
  <section class="masthead">
    <div class="container masthead__logo">
      <nuxt-img
        :src="props.logo"
        :alt="props.logoAlt || 'masthead logo'"
        width="16"
        height="16"
      />
      <div class="masthead__text" v-html="props.description"></div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  logo: {
    type: String,
    required: true,
  },
  logoAlt: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.masthead {
  background-color: $nimvio-light;
  height: 2rem;
}

.masthead__logo {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
}

.masthead__text {
  color: $nimvio-black;
  padding-left: 0.5rem;
}
</style>
