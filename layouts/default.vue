<template>
  <div>
    <NuxtLoadingIndicator
      :duration="10000"
      :color="`repeating-linear-gradient(to right,#e2e8f0 0%,#4169e1 50%,#00008B 100%)`"
    />
    <slot name="empty"></slot>

    <header class="header">
      <!--[--><!--[-->
      <section
        class="masthead"
        data-nimvio-content-id="Content_415ea6a4-1df7-46ed-94cf-7b2bc174b32a"
        data-nimvio-template-name="Widget"
      >
        <div class="container masthead__logo">
          <img
            src="https://media.nimvio.com/Project_f45da03f-b637-4717-9111-72e80f80308a/Media/Header/logo-icon_published.png"
            width="16"
            height="16"
            alt="masthead logo"
            data-nuxt-img=""
          />
          <div class="masthead__text"><p>Nimvio Demo Website</p></div>
        </div>
      </section>
      <section
        class="navbar"
        data-nimvio-content-id="Content_8b25e8ee-7cbd-4b9f-8678-2d6174d00756"
        data-nimvio-template-name="Widget"
      >
        <nav class="container navbar__wrapper">
          <div>
            <a
              aria-current="page"
              href="/"
              class="router-link-active router-link-exact-active"
              ><img
                src="https://media.nimvio.com/Project_f45da03f-b637-4717-9111-72e80f80308a/Media/Header/logo-nimvio-long_published.png"
                width="165"
                height="32"
                alt="website logo"
                data-nuxt-img=""
                class="navbar__logo"
            /></a>
          </div>
          <div class="navbar__menu-separator"></div>
          <div class="navbar__links">
            <!--]--><!--[-->
            <div
              class="navbar__link-wrapper"
              data-nimvio-content-id="Content_c75f58c6-7627-4993-8ce4-052f901790ac"
              data-nimvio-template-name="Page Article"
            >
              <nuxt-link :to="`/projects`" class="navbar__link">
                Projects
              </nuxt-link>
              <ul class="navbar__subnav"></ul>
              <ul class="navbar__subnav__link--mobile"></ul>
            </div>
            <!--]--><!--[-->
            <div
              class="navbar__link-wrapper"
              data-nimvio-content-id="Content_1a82cbd7-22ac-4ea7-88cb-046bd21bd4d5"
              data-nimvio-template-name="Page"
            >
              <nuxt-link :to="`/about`" class="navbar__link"> About </nuxt-link>
              <!-- Desktop Subnav-->
              <ul class="navbar__subnav">
                <!--[--><!--]-->
              </ul>
              <!-- Mobile Subnav-->
              <ul class="navbar__subnav__link--mobile">
                <!--[--><!--]-->
              </ul>
            </div>
            <!--]--><!--[-->
            <div
              class="navbar__link-wrapper"
              data-nimvio-content-id="Content_dcaebe69-5db8-44a6-91e2-8883b5bc710d"
              data-nimvio-template-name="Page"
            >
              <nuxt-link :to="`/news`" class="navbar__link"> News </nuxt-link>
              <!-- Desktop Subnav-->
              <ul class="navbar__subnav">
                <!--[--><!--]-->
              </ul>
              <!-- Mobile Subnav-->
              <ul class="navbar__subnav__link--mobile">
                <!--[--><!--]-->
              </ul>
            </div>
            <!--]--><!--[-->
            <div
              class="navbar__link-wrapper"
              data-nimvio-content-id="Content_8b56c6b8-14c0-4820-93a1-03718acfb4c5"
              data-nimvio-template-name="Page"
            >
              <nuxt-link :to="`/products`" class="navbar__link">
                Products
              </nuxt-link>
              <ul class="navbar__subnav">
                <!--[--><!--]-->
              </ul>
              <!-- Mobile Subnav-->
              <ul class="navbar__subnav__link--mobile">
                <!--[--><!--]-->
              </ul>
            </div>
            <!--]--><!--[-->
            <div
              class="navbar__link-wrapper"
              data-nimvio-content-id="Content_c75f58c6-7627-4993-8ce4-052f901790ac"
              data-nimvio-template-name="Page Article"
            >
              <nuxt-link :to="`/contact-us`" class="navbar__link">
                Contact Us
              </nuxt-link>
              <ul class="navbar__subnav"></ul>
              <ul class="navbar__subnav__link--mobile"></ul>
            </div>
            <!--]--><!--[-->
          </div>
          <div class="navbar__menu-separator"></div>
          <a
            role="button"
            class="navbar__btn-search"
            aria-label="Search"
            href="javascript:void(0)"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="icon"
              style=""
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              data-v-4fa0a2a1=""
            >
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
              ></path>
            </svg>
          </a>
          <div class="navbar__hamburger">
            <span></span><span></span><span></span>
          </div>
        </nav>
        <!----><!-- Mobile --><!---->
      </section>
      <!--]--><!--]-->
    </header>

    <WidgetsBreadcrumb />

    <slot name="main"> </slot>

    <footer class="footer">
      <!--[--><!--[-->
      <div
        class="container footer-bar"
        data-nimvio-content-id="Content_a85f9f70-e795-488e-a4c5-364f75ffc8d6"
        data-nimvio-template-name="Widget"
      >
        <div class="footer-bar__links">
          <a
            aria-current="page"
            href="/"
            class="router-link-active router-link-exact-active"
            ><h5 class="footer-bar__link-home">Nimvio</h5></a
          >
          <div class="footer-bar__link-separator"></div>
          <div class="footer-bar__links-social-media">
            <!--[--><a
              href="https://www.instagram.com/xtremaxsg/?hl=en"
              rel="noopener noreferrer"
              target="_blank"
              class="icon-link footer-bar__link-social-media"
              data-nimvio-content-id="Content_48b0ef2d-96f5-4a7d-a539-7e48854f8926"
              data-nimvio-template-name="Social Link"
              aria-label="instagram"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="icon"
                style=""
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                data-v-4fa0a2a1=""
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"
                ></path></svg></a
            ><a
              href="https://id.linkedin.com/company/xtremax"
              rel="noopener noreferrer"
              target="_blank"
              class="icon-link footer-bar__link-social-media"
              data-nimvio-content-id="Content_81176200-e9a4-44d7-9048-7f48d81e168e"
              data-nimvio-template-name="Social Link"
              aria-label="linkedin"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="icon"
                style=""
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                data-v-4fa0a2a1=""
              >
                <path
                  fill="currentColor"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
                ></path></svg></a
            ><a
              href="https://twitter.com/xtremaxsg"
              rel="noopener noreferrer"
              target="_blank"
              class="icon-link footer-bar__link-social-media"
              data-nimvio-content-id="Content_70c46bbb-0777-4d99-ad8f-354c97c1ca52"
              data-nimvio-template-name="Social Link"
              aria-label="twitter"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="icon"
                style=""
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                data-v-4fa0a2a1=""
              >
                <path
                  fill="currentColor"
                  d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"
                ></path></svg></a
            ><a
              href="https://www.youtube.com/channel/UCL-qHktRoc4-D4ZkVx92cgA"
              rel="noopener noreferrer"
              target="_blank"
              class="icon-link footer-bar__link-social-media"
              data-nimvio-content-id="Content_e8056119-7a39-4490-87ad-35e3935f44a9"
              data-nimvio-template-name="Social Link"
              aria-label="youtube"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="icon"
                style=""
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                data-v-4fa0a2a1=""
              >
                <path
                  fill="currentColor"
                  d="m10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73Z"
                ></path></svg></a
            ><a
              href="https://www.facebook.com/Xtremaxsg/"
              rel="noopener noreferrer"
              target="_blank"
              class="icon-link footer-bar__link-social-media"
              data-nimvio-content-id="Content_90ec608c-68b3-4e8a-9599-0d8e48e2c51f"
              data-nimvio-template-name="Social Link"
              aria-label="facebook"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="icon"
                style=""
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                data-v-4fa0a2a1=""
              >
                <path
                  fill="currentColor"
                  d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"
                ></path></svg></a
            ><!--]-->
          </div>
        </div>
        <div class="footer-bar__navs">
          <!--[--><!--[--><!----><!--]--><!--[--><!----><!--]--><!--[-->
          <div
            class="footer-bar__nav"
            data-nimvio-content-id="Content_1a82cbd7-22ac-4ea7-88cb-046bd21bd4d5"
            data-nimvio-template-name="Page"
          >
            <a href="/about" class="">About</a
            ><!--[--><!--]-->
          </div>
          <!--]--><!--[-->
          <div
            class="footer-bar__nav"
            data-nimvio-content-id="Content_dcaebe69-5db8-44a6-91e2-8883b5bc710d"
            data-nimvio-template-name="Page"
          >
            <a href="/news" class="">News</a
            ><!--[--><!--]-->
          </div>
          <!--]--><!--[-->
          <div
            class="footer-bar__nav"
            data-nimvio-content-id="Content_7af4dbed-7a1f-49fa-9be6-a999a7af3f2b"
            data-nimvio-template-name="Page Article"
          >
            <a href="/lorem-ipsum" class="">Lorem Ipsum</a
            ><!--[--><!--]-->
          </div>
          <!--]--><!--[-->
          <div
            class="footer-bar__nav"
            data-nimvio-content-id="Content_8b56c6b8-14c0-4820-93a1-03718acfb4c5"
            data-nimvio-template-name="Page"
          >
            <a href="/products" class="">Products</a
            ><!--[--><!--]-->
          </div>
          <!--]--><!--[-->
          <div
            class="footer-bar__nav"
            data-nimvio-content-id="Content_c75f58c6-7627-4993-8ce4-052f901790ac"
            data-nimvio-template-name="Page Article"
          >
            <a href="/contact-us" class="">Contact Us</a
            ><!--[--><!--]-->
          </div>
          <!--]--><!--[--><!----><!--]--><!--[--><!----><!--]--><!--]-->
        </div>
      </div>
      <div
        class="container footer-panel"
        data-nimvio-content-id="Content_e9594c63-5a2c-4192-8075-9297444419c9"
        data-nimvio-template-name="Widget"
      >
        <div class="footer-panel__links">
          <!--[--><a
            href="/privacy-policy"
            class="footer-panel__link"
            data-nimvio-content-id="Content_baee091d-0ec2-4809-a2aa-b21a41ea4eb7"
            data-nimvio-template-name="Page Article"
            >Privacy Policy</a
          ><a
            href="/terms-of-use"
            class="footer-panel__link"
            data-nimvio-content-id="Content_5f06bb24-28ce-4219-95a3-379d6e7e281d"
            data-nimvio-template-name="Page Article"
            >Terms of Use</a
          ><!--]-->
          <div class="footer-panel__link-separator"></div>
          <div class="footer-panel__link-copyright">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="icon mr-2"
              style=""
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              data-v-4fa0a2a1=""
            >
              <path
                fill="currentColor"
                d="M10.08 10.86c.05-.33.16-.62.3-.86c.3-.56.81-.85 1.5-.86c.45 0 .86.2 1.15.49c.28.31.47.74.47 1.17h1.8c-.02-.47-.11-.9-.3-1.3c-.15-.38-.38-.72-.68-1c-1.45-1.34-4.14-1.15-5.37.37c-1.29 1.67-1.32 4.59-.01 6.26c1.21 1.49 3.86 1.7 5.3.37c.31-.25.56-.56.76-.92c.16-.36.27-.74.28-1.15H13.5c0 .21-.07.4-.16.57c-.09.19-.21.34-.34.47c-.33.26-.72.4-1.14.4c-.36-.01-.66-.08-.89-.23a1.41 1.41 0 0 1-.59-.64c-.5-.9-.42-2.15-.3-3.14M12 2C6.5 2 2 6.5 2 12c.53 13.27 19.5 13.26 20 0c0-5.5-4.5-10-10-10m0 18c-4.41 0-8-3.59-8-8c.44-10.61 15.56-10.61 16 0c0 4.41-3.59 8-8 8Z"
              ></path>
            </svg>
            2023 Nimvio, Last Updated May 18, 2023
          </div>
        </div>
      </div>
      <!--]--><!--]-->
    </footer>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : "Nimvio Website";
  },
});
</script>

<script>
export default {
  name: "Default",
};
</script>

<style lang="scss">
@media (min-width: 768px) {
  .footer {
    margin-top: 6rem;
  }
}

.footer {
  margin-top: 3rem;
  color: $nimvio-white;
  background-color: $nimvio-black;
}
</style>
