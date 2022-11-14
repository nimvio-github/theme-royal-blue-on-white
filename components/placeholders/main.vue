<template>
  <div>
    <common-breadcrumb v-if="templateName === 'Page Article'" />

    <component-renderer
      v-if="pageComponents"
      :components="pageComponents"
    ></component-renderer>
  </div>
</template>

<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
const templateName = attrs["template-name"];
const pageComponents = attrs["page-components"];
</script>
