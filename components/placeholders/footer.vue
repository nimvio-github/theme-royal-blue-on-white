<template>
  <footer class="bg-dark-gray text-dark-white mt-12 md:mt-24 footer-bg-custom">
    <widget-renderer v-if="data.widgets" :components="data.widgets" />
  </footer>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import { getContentById } from "~/utils/dataFetching";

const component = getCurrentInstance();
const placeholderId = component.vnode.key;

// Use unique key for async data e.g. placeholderId
const { data } = await useAsyncData(
  `placeholderId${placeholderId}`,
  async ({ $gqlClient }) => {
    const { data: response } = await getContentById($gqlClient, placeholderId);

    const placeholderData = response.Data;
    const widgetIds = placeholderData.widgets
      ? placeholderData.widgets.ContentIDs
      : [];

    const widgets = widgetIds.map(async (id) => {
      const { data: widget } = await getContentById($gqlClient, id);
      return widget;
    });

    return {
      widgets: await Promise.all(widgets),
    };
  }
);
</script>
