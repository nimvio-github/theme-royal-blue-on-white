<template>
  <section v-if="showEmpty" class="flex items-center justify-center h-screen">
    <p class="prose text-2xl tracking-tight">
      It looks like you are trying to create a new page? Don't worry your new
      page will be visible right away💪.
      <br />
      <br />

      Start by choosing a Layout for your new page 👉.
    </p>
  </section>

  <section
    v-if="data.Data.layoutName && !data.Data.placeholder"
    class="flex items-center justify-center h-screen"
  >
    <p class="prose text-2xl tracking-tight">
      Now continue with the Placeholder, it is the location where you want your
      content to appear on your page 📑.
    </p>
  </section>

  <section
    v-if="
      data.Data.layoutName && data.Data.placeholder && !data.Data.contentTitle
    "
    class="flex items-center justify-center h-screen"
  >
    <p class="prose text-2xl tracking-tight">
      Great Job 👍, your new page now already have a Layout and a Placeholder in
      place. The next step is to give your content a Title📝.

      <br />
      <br />
      After you finish with your Draft, don't forget to
      <span class="font-extrabold">Save</span> your content to prevent loosing
      your work 👌.

      <br />
      <br />
      If the preview doesn't seem to work, try to click on the
      <span class="font-extrabold">Refresh</span> button in the above toolbar
      🤞.
    </p>
  </section>
</template>

<script setup>
defineProps({
  showEmpty: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
