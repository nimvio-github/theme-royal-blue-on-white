<template>
  <article v-if="!props.visibility?.hidden" class="py-8 md:py-12">
    <common-container>
      <div class="flex items-center flex-wrap gap-8 mb-8 md:mb-12">
        <p
          v-if="props.category"
          class="uppercase font-semibold"
          data-kontent-component-id="category"
        >
          {{ props.category }}
        </p>
        <p v-if="props.publishedDate">
          {{
            new Date(props.publishedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
        <div class="flex-grow"></div>
        <div
          v-if="hasSharingChannel"
          data-kontent-component-id="sharingChannels"
          class="hidden md:flex items-center"
        >
          <span class="pr-2">Share</span>
          <common-icon-link
            v-if="props.sharingChannels.facebook"
            icon-size="1.2em"
            class="p-3"
            icon-name="facebook"
            :to="`https://www.facebook.com/sharer/sharer.php?u=${sharedUrl}`"
            target="_blank"
            aria-label="Facebook"
          />
          <common-icon-link
            v-if="props.sharingChannels.twitter"
            icon-size="1.2em"
            class="p-3"
            icon-name="twitter"
            :to="`https://twitter.com/intent/tweet?text=${sharedUrl}`"
            target="_blank"
            aria-label="Twitter"
          />
          <common-icon-link
            v-if="props.sharingChannels.linkedIn"
            icon-size="1.2em"
            class="p-3"
            icon-name="linkedin"
            :to="`https://www.linkedin.com/shareArticle?mini=true&url=${sharedUrl}&title=${props.title}`"
            target="_blank"
            aria-label="LinkedIn"
          />
          <common-icon-link
            v-if="props.sharingChannels.whatsApp"
            icon-size="1.2em"
            class="p-3"
            icon-name="whatsapp"
            :to="`https://wa.me/send?text=${sharedUrl}`"
            target="_blank"
            aria-label="WhatsApp"
          />
        </div>
      </div>
      <h1
        class="text-4xl font-bold text-royal-blue"
        data-kontent-component-id="title"
      >
        {{ props.title }}
      </h1>
      <div
        data-kontent-component-id="content"
        class="prose max-w-full mt-8 prose-a:text-royal-blue hover:prose-a:text-dark-blue"
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
    type: [String, Object],
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
