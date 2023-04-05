<template>
  <div class="bg-royal-blue text-light-white">
    <common-container>
      <nav class="py-4 overflow-x-auto">
        <ul class="flex items-center">
          <li
            v-for="(item, idx) in crumbs"
            :key="item.path"
            :class="idx !== 0 && `before:content-['/']`"
          >
            <NuxtLink
              :to="item.to"
              class="p-4 capitalize hover:opacity-80 truncate"
              :class="idx == 0 && 'pl-0'"
              >{{ item.text }}</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </common-container>
  </div>
</template>

<script>
export default {
  computed: {
    crumbs: function () {
      const pathArray = this.$route.path.split("/");
      pathArray.shift();
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          text: path.split("-").join(" "),
        });
        return breadcrumbArray;
      }, []);

      breadcrumbs.unshift({ path: "home", to: "/", text: "home" });
      return breadcrumbs;
    },
  },
};
</script>
