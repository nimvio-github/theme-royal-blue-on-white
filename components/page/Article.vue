<template>
  <article v-if="!props.visibility?.hidden" class="page-article">
    <common-container>
      <div class="article__information">
        <p
          v-if="props.category"
          class="article__category"
          data-kontent-component-id="category"
        >
          {{ props.category }}
        </p>
        <p v-if="props.publishedDate" class="article__date">
          {{
            new Date(props.publishedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
        <div class="article__information__separator"></div>
        <div
          v-if="hasSharingChannel"
          data-kontent-component-id="sharingChannels"
          class="article__social-links"
        >
          <span class="pr-2">Share</span>
          <common-icon-link
            v-if="props.sharingChannels.facebook"
            icon-size="1.2em"
            class="article__social-link"
            icon-name="facebook"
            :to="`https://www.facebook.com/sharer/sharer.php?u=${sharedUrl}`"
            target="_blank"
            aria-label="Facebook"
          />
          <common-icon-link
            v-if="props.sharingChannels.twitter"
            icon-size="1.2em"
            class="article__social-link"
            icon-name="twitter"
            :to="`https://twitter.com/intent/tweet?text=${sharedUrl}`"
            target="_blank"
            aria-label="Twitter"
          />
          <common-icon-link
            v-if="props.sharingChannels.linkedIn"
            icon-size="1.2em"
            class="article__social-link"
            icon-name="linkedin"
            :to="`https://www.linkedin.com/shareArticle?mini=true&url=${sharedUrl}&title=${props.title}`"
            target="_blank"
            aria-label="LinkedIn"
          />
          <common-icon-link
            v-if="props.sharingChannels.whatsApp"
            icon-size="1.2em"
            class="article__social-link"
            icon-name="whatsapp"
            :to="`https://wa.me/send?text=${sharedUrl}`"
            target="_blank"
            aria-label="WhatsApp"
          />
        </div>
      </div>
      <h1 class="article__title" data-kontent-component-id="title">
        {{ props.title }}
      </h1>
      <div
        data-kontent-component-id="content"
        class="article__content prose"
        v-html="props.content"
      ></div>
    </common-container>
  </article>
</template>

<script setup>
const props = defineProps({
  category: {
    type: String,
    default: "",
  },
  publishedDate: {
    type: String,
    default: "",
  },
  sharingChannels: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  visibility: {
    type: [String, Object],
    required: true,
  },
});

const config = useRuntimeConfig();
const hostURL = config.public.hostURL;

const route = useRoute();
const sharedUrl = encodeURIComponent(hostURL + route.fullPath);

const hasSharingChannel = computed(() => {
  return Object.keys(props.sharingChannels).some(
    (item) => props.sharingChannels[item]
  );
});
</script>

<style lang="scss">
.page-article {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.article__information {
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
}

.article__category {
  text-transform: uppercase;
  font-weight: 600;
}

.article__date {
}

.article__information__separator {
  flex-grow: 1;
}

.article__social-links {
  display: none;
  align-items: center;
}

.article__social-link {
  padding: 0.75rem;
}

.article__title {
  color: $nimvio-blue;
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.article__content {
  max-width: 100%;
  margin-top: 2rem;

  a {
    color: $nimvio-blue;
    text-decoration: underline;
    font-weight: 500;

    &:hover {
      color: $nimvio-dark-blue;
    }
  }

  p {
    margin-bottom: 1.25em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.6em;
    margin-bottom: 0.6em;
  }
}

@media (min-width: 768px) {
  .page-article {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .article__information {
    margin-bottom: 3rem;
  }

  .article__social-links {
    display: flex;
  }
}
</style>
