<template>
  <div class="container mx-auto">
    <div class="py-8 flex md:flex-row flex-col md:gap-8 gap-4">
      <NuxtLink
        v-for="link in props.policyContents"
        :key="link.ContentID"
        :data-nimvio-content-id="link.ContentID"
        :data-nimvio-template-name="link.TemplateName"
        class="font-bold hover:text-light-white"
        :to="`/${link.Data.pageSlug}`"
        >{{ link.Data.pageTitle }}
      </NuxtLink>
      <div class="flex-grow"></div>
      <div class="flex items-center">
        <icon name="mdi-copyright" class="mr-2" />
        {{ new Date().getFullYear() }} {{ props.copyrightName }}, Last Updated
        {{
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  policyContents: {
    type: Array,
    default: () => [],
  },
  copyrightName: {
    type: String,
    required: true,
  },
});
</script>
