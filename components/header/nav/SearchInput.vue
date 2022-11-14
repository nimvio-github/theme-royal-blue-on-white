<template>
  <form @submit.prevent="handleSearch">
    <div class="relative">
      <input
        id="search"
        v-model="state.search"
        type="search"
        class="block focus:outline-0 p-4 py-3 bg-light-white w-full text-sm rounded-sm border border-dark-gray focus:ring-royal-blue focus:border-royal-blue"
        placeholder="Type here to search"
      />
      <common-button-link
        class="absolute right-0 top-0 h-full flex items-center justify-center rounded-r-sm rounded-l-none"
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
