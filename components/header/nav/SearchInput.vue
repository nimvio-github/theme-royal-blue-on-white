<template>
  <form class="container navbar__search" @submit.prevent="handleSearch">
    <div class="relative">
      <input
        id="search"
        v-model="state.search"
        type="search"
        class="navbar__search__input"
        placeholder="Type here to search"
      />
      <common-button-link
        class="btn-search"
        role="button"
        @click.prevent="handleSearch"
      >
        Search
      </common-button-link>
    </div>
  </form>
</template>

<script setup>
const state = reactive({
  search: "",
});

const router = useRouter();
const route = useRoute();
const searchQuery = route.query.q;

const handleSearch = () => {
  router.push(`/search?q=${state.search}`);
};

onMounted(() => {
  state.search = searchQuery;
});
</script>

<style lang="scss">
.navbar__search {
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.navbar__search--desktop {
  display: none;
}

@media (min-width: 1024px) {
  .navbar__search {
    display: block;
  }
}

.navbar__search__input {
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.75rem 1rem;
  background-color: $nimvio-white;
  border: 1px solid $nimvio-gray;
  border-radius: 0.125rem;
  width: 100%;

  &:focus {
    border-color: $nimvio-blue;
    outline-width: 0px;
  }
}

.btn-search {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  position: absolute;
}
</style>
