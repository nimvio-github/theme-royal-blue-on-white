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
import Search from "~~/components/widgets/search.vue";
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
    getComponentProps(component) {
      const { Data, TemplateName, ContentID, PublishedAt } = component;

      const webLinkProps = {
        "data-nimvio-content-id": ContentID,
        "data-nimvio-template-name": TemplateName,
      };
      switch (TemplateName) {
        case "Page":
          return {
            ...webLinkProps,
            title: Data.contentTitle,
            content: Data.content,
            sharingChannels: Data.sharingChannels,
            category: Data.category,
            publishedDate: !Data.publishDate?.hide ? PublishedAt : "",
            visibility: Data.visibility,
          };
        case "Page Article":
          return {
            ...webLinkProps,
            title: Data.contentTitle,
            content: Data.content,
            sharingChannels: Data.sharingChannels,
            category: Data.category,
            publishedDate: !Data.publishDate?.hide ? component.PublishedAt : "",
            visibility: Data.visibility,
          };
        case "Article":
          return {
            ...webLinkProps,
            title: Data.title,
            content: Data.content,
            sharingChannels: Data.sharingChannels,
            category: Data.category,
            visibility: Data.visibility,
          };
        case "ArticleCardsWidget":
          return {
            ...webLinkProps,
            title: Data.title ? Data.title : "",
            link: Data.link,
            contents: Data.articles || [],
          };
        case "HeroBannerWidget":
          return {
            ...webLinkProps,
            title: Data.title,
            description: Data.description,
            button: {
              text: Data.buttonText,
              to: Data.buttonUrl,
            },
            backgroundMedia: Data.backgroundMedia?.MediaUrl,
          };
        case "ItemBannerWidget":
          return {
            ...webLinkProps,
            tag: Data.tag,
            title: Data.title,
            description: Data.description,
            link: {
              text: Data.linkText,
              url: Data.linkUrl,
            },
            media: {
              url: Data.media?.MediaUrl,
              alt: Data.media?.AltText,
            },
            reversed: Data.type === "right",
          };
        case "ItemCardsWidget":
          return {
            ...webLinkProps,
            title: Data.title,
            contents: Data.datasource || [],
          };
        case "SliderBannerWidget":
          return {
            ...webLinkProps,
            contents: Data.datasource || [],
            sliderOptions: Data.sliderOptions || "{}",
          };
        case "Widget":
          if (Data.name === "HeaderPanel") {
            const widgetContent = Data.datasource[0];
            return {
              ...webLinkProps,
              logo: widgetContent.Data.image?.MediaUrl,
              logoAlt: widgetContent.Data.image?.AltText,
              description: widgetContent.Data.description,
            };
          } else if (Data.name === "HeaderBar") {
            const widgetContent = Data.datasource[0];
            return {
              ...webLinkProps,
              logo: widgetContent.Data.logo?.MediaUrl,
              logoAlt: widgetContent.Data.logo?.AltText,
              navigationItemsId:
                widgetContent.Data.navigationItems[0].ContentID,
            };
          } else if (Data.name === "Breadcrumb") {
            return {
              ...webLinkProps,
            };
          } else if (Data.name === "FooterBar") {
            const widgetContent = Data.datasource[0];
            return {
              ...webLinkProps,
              navigationItemsId:
                widgetContent.Data.navigationItems[0].ContentID,
              title: widgetContent.Data.websiteName,
              socialLinks: widgetContent.Data.socialMediaLinks,
            };
          } else if (Data.name === "FooterPanel") {
            const widgetContent = Data.datasource[0];
            return {
              ...webLinkProps,
              policyContents: widgetContent.Data.policyContents,
              copyrightName: widgetContent.Data.copyrightName,
            };
          } else if (Data.name === "ArticleList") {
            return {
              ...webLinkProps,
              datasource: Data.datasource || [],
            };
          } else if (Data.name === "Search") {
            return {
              ...webLinkProps,
            };
          }
          break;
        default:
          break;
      }
    },
    getComponentType(component) {
      const { Data, TemplateName } = component;

      switch (TemplateName) {
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
        case "SliderBannerWidget":
          return SliderBanner;
        case "Widget":
          if (Data.name === "HeaderPanel") {
            return HeaderPanel;
          } else if (Data.name === "HeaderBar") {
            return HeaderBar;
          } else if (Data.name === "Breadcrumb") {
            return Breadcrumb;
          } else if (Data.name === "FooterBar") {
            return FooterBar;
          } else if (Data.name === "FooterPanel") {
            return FooterPanel;
          } else if (Data.name === "ArticleList") {
            return ArticleList;
          } else if (Data.name === "Search") {
            return Search;
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>
