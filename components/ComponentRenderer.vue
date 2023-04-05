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
import ArticleCards from "~~/components/widgets/article-cards.vue";
import HeroBanner from "~~/components/widgets/hero-banner.vue";
import ItemBanner from "~~/components/widgets/item-banner.vue";
import ItemCards from "~~/components/widgets/item-cards.vue";
import ArticleList from "~~/components/widgets/article-list.vue";
import SliderBanner from "~~/components/widgets/slider-banner.vue";
import Search from "~~/components/page/Search.vue";
import HeaderBar from "~~/components/widgets/header-bar.vue";
import HeaderPanel from "~~/components/widgets/header-panel.vue";
import Breadcrumb from "~~/components/widgets/breadcrumb.vue";
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
        case "Page":
          return {
            ...webLinkProps,
            title: componentData.Data.contentTitle,
            content: componentData.Data.content,
            sharingChannels: componentData.Data.sharingChannels,
            category: componentData.Data.category,
            publishedDate: !componentData.Data.publishDate?.hide
              ? componentData.PublishedAt
              : "",
            visibility: componentData.Data.visibility,
          };
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
            visibility: componentData.Data.visibility,
          };
        case "ArticleCardsWidget":
          return {
            ...webLinkProps,
            title: componentData.Data.title ? componentData.Data.title : "",
            link: componentData.Data.link,
            contents: componentData.Data.articles || [],
          };
        case "HeroBannerWidget":
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
        case "ItemBannerWidget":
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
        case "ItemCardsWidget":
          return {
            ...webLinkProps,
            title: componentData.Data.title,
            contents: componentData.Data.datasource || [],
          };
        case "ArticleListWidget":
          return {
            ...webLinkProps,
            datasource: componentData.Data.datasource || [],
          };
        case "SliderBannerWidget":
          return {
            ...webLinkProps,
            contents: componentData.Data.datasource || [],
            sliderOptions: componentData.Data.sliderOptions || "{}",
          };
        case "Search":
          return {
            ...webLinkProps,
          };
        case "Widget":
          if (componentData.Data.name === "HeaderPanel") {
            const widgetContent = componentData.Data.datasource[0];
            return {
              ...webLinkProps,
              logo: widgetContent.Data.image?.MediaUrl,
              logoAlt: widgetContent.Data.image?.AltText,
              description: widgetContent.Data.description,
            };
          } else if (componentData.Data.name === "HeaderBar") {
            const widgetContent = componentData.Data.datasource[0];
            return {
              ...webLinkProps,
              logo: widgetContent.Data.logo?.MediaUrl,
              logoAlt: widgetContent.Data.logo?.AltText,
              navigationItemsId:
                widgetContent.Data.navigationItems[0].ContentID,
            };
          } else if (componentData.Data.name === "Breadcrumb") {
            return {
              ...webLinkProps,
            };
          } else if (componentData.Data.name === "FooterBar") {
            const widgetContent = componentData.Data.datasource[0];
            return {
              ...webLinkProps,
              navigationItemsId:
                widgetContent.Data.navigationItems[0].ContentID,
              title: widgetContent.Data.websiteName,
              socialLinks: widgetContent.Data.socialMediaLinks,
            };
          } else if (componentData.Data.name === "FooterPanel") {
            const widgetContent = componentData.Data.datasource[0];
            return {
              ...webLinkProps,
              policyContents: widgetContent.Data.policyContents,
              copyrightName: widgetContent.Data.copyrightName,
            };
          }
          break;
        default:
          break;
      }
    },
    getComponentType(componentData) {
      switch (componentData.TemplateName) {
        case "Page Article":
        case "Page":
          return Article;
        case "Article":
          return Article;
        case "ArticleCardsWidget":
          return ArticleCards;
        case "HeroBannerWidget":
          return HeroBanner;
        case "ItemBannerWidget":
          return ItemBanner;
        case "ItemCardsWidget":
          return ItemCards;
        case "ArticleListWidget":
          return ArticleList;
        case "SliderBannerWidget":
          return SliderBanner;
        case "Search":
          return Search;
        case "Widget":
          if (componentData.Data.name === "HeaderPanel") {
            return HeaderPanel;
          } else if (componentData.Data.name === "HeaderBar") {
            return HeaderBar;
          } else if (componentData.Data.name === "Breadcrumb") {
            return Breadcrumb;
          } else if (componentData.Data.name === "FooterBar") {
            return FooterBar;
          } else if (componentData.Data.name === "FooterPanel") {
            return FooterPanel;
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>
