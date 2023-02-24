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
import SliderBanner from "~~/components/page/SliderBanner.vue";
import Search from "~~/components/page/Search.vue";
import HeaderBar from "~~/components/widgets/header-bar.vue";
import HeaderPanel from "~~/components/widgets/header-panel.vue";
import FooterBar from "~~/components/widgets/footer-bar.vue";
import FooterPanel from "~~/components/widgets/footer-panel.vue";

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
        "data-nimvio-content-id": componentData.ContentID,
        "data-nimvio-template-name": componentData.TemplateName,
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
            title: componentData.Data.title ? componentData.Data.title : "",
            link: componentData.Data.link,
            contents: componentData.Data.articles || [],
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
            contents: componentData.Data.itemCards || [],
          };
        case "ArticleList":
          return {
            ...webLinkProps,
            dataSource: componentData.Data.dataSource || [],
          };
        case "SliderBanner":
          return {
            ...webLinkProps,
            contents: componentData.Data.componentItems || [],
            sliderOptions: componentData.Data.sliderOptions || "{}",
          };
        case "Header Bar":
          return {
            ...webLinkProps,
            logo: componentData.Data.logo?.MediaUrl,
            logoAlt: componentData.Data.logo?.AltText,
            navigationItemsId: componentData.Data.navigationItems[0].ContentID,
          };
        case "Header Panel":
          return {
            ...webLinkProps,
            logo: componentData.Data.image?.MediaUrl,
            logoAlt: componentData.Data.image?.AltText,
            description: componentData.Data.description,
          };
        case "Footer Bar":
          return {
            ...webLinkProps,
            navigationItemsId: componentData.Data.navigationItems[0].ContentID,
            title: componentData.Data.websiteName,
            socialLinks: componentData.Data.socialMediaLinks,
          };
        case "Footer Panel":
          return {
            ...webLinkProps,
            policyContents: componentData.Data.policyContents,
            copyrightName: componentData.Data.copyrightName,
          };
        case "Search":
          return {
            ...webLinkProps,
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
        case "SliderBanner":
          return SliderBanner;
        case "Header Bar":
          return HeaderBar;
        case "Header Panel":
          return HeaderPanel;
        case "Footer Bar":
          return FooterBar;
        case "Footer Panel":
          return FooterPanel;
        case "Search":
          return Search;
        default:
          break;
      }
    },
  },
};
</script>
