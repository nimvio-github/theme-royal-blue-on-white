<template>
  <div class="container footer-panel">
    <div class="footer-panel__links">
      <NuxtLink
        v-for="link in props.policyContents"
        :key="link.ContentID"
        :data-nimvio-content-id="link.ContentID"
        :data-nimvio-template-name="link.TemplateName"
        class="footer-panel__link"
        :to="`/${link.Data.pageSlug}`"
        >{{ link.Data.pageTitle }}
      </NuxtLink>
      <div class="footer-panel__link-separator"></div>
      <div class="footer-panel__link-copyright">
        <icon name="mdi-copyright" class="mr-2" />
        {{ new Date().getFullYear() }} {{ props.copyrightName }}, Last Updated
        {{
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}. Powered by&nbsp;
        <a
          class="logo-nimvio"
          aria-label="Nimvio"
          href="https://nimvio.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          <!-- <span>N</span>imvio -->
          <img src="/logo-nimvio.png" alt="nimvio.com" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  policyContents: {
    type: Array,
    default: () => [],
  },
  copyrightName: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.footer-panel {
  .footer-panel__links {
    padding-top: 2rem;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-panel__link {
    font-weight: 700;
  }

  .footer-panel__link-separator {
    flex-grow: 1;
  }

  .footer-panel__link-copyright {
    display: flex;
    align-items: center;
  }
}

@media (min-width: 768px) {
  .footer-panel {
    .footer-panel__links {
      flex-direction: row;
      gap: 2rem;
    }
  }
}

.logo-nimvio {
  color: #2e2774;
  background-color: white;
  padding: 4px 7px;
  border-radius: 2px;
  margin-left: 4px;
}
</style>
