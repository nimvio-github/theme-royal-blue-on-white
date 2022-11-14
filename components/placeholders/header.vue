<template>
  <header class="header">
    <widget-renderer v-if="data.widgets" :components="data.widgets" />
  </header>
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
