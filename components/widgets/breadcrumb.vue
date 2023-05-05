<template>
  <div class="breadcrumb-wrapper">
    <common-container>
      <nav class="breadcrumb__navs">
        <ul>
          <li
            v-for="(item, idx) in crumbs"
            :key="item.path"
            :class="idx !== 0 && `before:content-['/']`"
          >
            <NuxtLink
              :to="item.to"
              class="breadcrumb__nav"
              :class="idx == 0 && 'breadcrumb__nav--first-child'"
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

<style lang="scss">
.breadcrumb-wrapper {
  background-color: $nimvio-blue;
  color: $nimvio-white;

  .breadcrumb__navs {
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow-x: auto;

    ul {
      display: flex;
      align-items: center;
    }
  }

  .breadcrumb__nav {
    text-transform: capitalize;
    padding: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .breadcrumb__nav--first-child {
    padding-left: 0;
  }
}
</style>
