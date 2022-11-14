<template>
  <component
    :is="getComponentType(component)"
    v-for="component in components"
    :key="component.ContentID"
    :page-data="pageData"
    :template-name="templateName"
    :page-components="pageComponents"
    v-bind="getComponentProps(component)"
  />
</template>

<script>
import header from "./placeholders/header.vue";
import main from "./placeholders/main.vue";
import footer from "./placeholders/footer.vue";

export default {
  props: {
    components: {
      type: Array,
      default: () => [],
    },
    pageData: {
      type: Object,
      default: () => null,
    },
    templateName: {
      type: String,
      default: () => "",
    },
    pageComponents: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getComponentType(componentData) {
      switch (componentData.Data.placeholderName) {
        case "header":
          return header;
        case "main":
          return main;
        case "footer":
          return footer;
        default:
          break;
      }
    },
    getComponentProps(componentData) {
      const webLinkProps = {
        "data-kontent-item-id": componentData.ContentID,
        "data-kontent-element-codename": componentData.TemplateName,
      };
      switch (componentData.TemplateName) {
        case "Placeholder":
          return {
            ...webLinkProps,
          };
        default:
          break;
      }
    },
  },
};
</script>
