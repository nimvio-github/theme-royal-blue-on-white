<template>
  <component
    :is="getComponentType(component)"
    v-for="component in components"
    :key="component.ContentID"
    v-bind="getComponentProps(component)"
  />
</template>

<script>
import Article from "~~/components/page/Article.vue";
import ArticleCards from "~~/components/page/ArticleCards.vue";
import Hero from "~~/components/page/Hero.vue";
import ItemBanner from "~~/components/page/ItemBanner.vue";
import ItemCards from "~~/components/page/ItemCards.vue";
import ArticleList from "~~/components/page/ArticleList.vue";

export default {
  props: {
    components: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getComponentProps(componentData) {
      const webLinkProps = {
        "data-kontent-item-id": componentData.ContentID,
        "data-kontent-element-codename": componentData.TemplateName,
      };
      switch (componentData.TemplateName) {
        case "Page Article":
          return {
            ...webLinkProps,
            title: componentData.Data.contentTitle,
            content: componentData.Data.content,
            sharingChannels: componentData.Data.sharingChannels,
            category: componentData.Data.category,
            publishedDate: !componentData.Data.publishDate?.hide
              ? componentData.PublishedAt
              : "",
          };
        case "Article":
          return {
            ...webLinkProps,
            title: componentData.Data.title,
            content: componentData.Data.content,
            sharingChannels: componentData.Data.sharingChannels,
            category: componentData.Data.category,
          };
        case "ArticleCards":
          return {
            ...webLinkProps,
            title: componentData.Data.pageTitle
              ? componentData.Data.pageTitle
              : "",
            link: componentData.Data.link,
            contents: componentData.Data.articles.ContentIDs || [],
          };
        case "HeroBanner":
          return {
            ...webLinkProps,
            title: componentData.Data.title,
            description: componentData.Data.description,
            button: {
              text: componentData.Data.buttonText,
              to: componentData.Data.buttonUrl,
            },
            backgroundMedia: componentData.Data.backgroundMedia?.MediaUrl,
          };
        case "ItemBanner":
          return {
            ...webLinkProps,
            tag: componentData.Data.tag,
            title: componentData.Data.title,
            description: componentData.Data.description,
            link: {
              text: componentData.Data.linkText,
              url: componentData.Data.linkUrl,
            },
            media: {
              url: componentData.Data.media?.MediaUrl,
              alt: componentData.Data.media?.AltText,
            },
            reversed: componentData.Data.type === "right",
          };
        case "ItemCards":
          return {
            ...webLinkProps,
            title: componentData.Data.title,
            contents: componentData.Data.itemCards.ContentIDs || [],
          };
        case "ArticleList":
          return {
            ...webLinkProps,
            dataSource: componentData.Data.dataSource.ContentIDs || [],
          };
        default:
          break;
      }
    },
    getComponentType(componentData) {
      switch (componentData.TemplateName) {
        case "Page Article":
        case "Article":
          return Article;
        case "ArticleCards":
          return ArticleCards;
        case "HeroBanner":
          return Hero;
        case "ItemBanner":
          return ItemBanner;
        case "ItemCards":
          return ItemCards;
        case "ArticleList":
          return ArticleList;
        default:
          break;
      }
    },
  },
};
</script>
