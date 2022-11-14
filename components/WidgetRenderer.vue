<template>
  <component
    :is="getComponentType(component)"
    v-for="component in components"
    :key="component.ContentID"
    v-bind="getComponentProps(component)"
    :page-data="pageData"
  />
</template>

<script>
import HeaderPanel from "./widgets/header-panel.vue";
import HeaderBar from "./widgets/header-bar.vue";
import FooterBar from "./widgets/footer-bar.vue";
import FooterPanel from "./widgets/footer-panel.vue";

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
  },
  methods: {
    getComponentType(componentData) {
      switch (componentData.Data.widgetName) {
        case "HeaderPanel":
          return HeaderPanel;
        case "HeaderBar":
          return HeaderBar;
        case "FooterBar":
          return FooterBar;
        case "FooterPanel":
          return FooterPanel;
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
        case "Widget":
          return {
            ...webLinkProps,
            datasource: componentData.Data.datasource,
            widgetImplementation: componentData.Data.widgetImplementation,
            widgetName: componentData.Data.widgetName,
          };
        default:
          break;
      }
    },
  },
};
</script>
