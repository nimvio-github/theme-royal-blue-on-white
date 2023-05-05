<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <section v-if="data && !pending" class="container">
    <div class="search-summary">
      <h2>
        {{
          `${data.totalItems} ${
            data.totalItems > 1 ? "results" : "result"
          } for '${route.query.q || ""}'`
        }}
      </h2>
      <div class="search-summary-separator"></div>
      <span v-if="showPagination">{{
        `Page ${state.page} of ${paginate.totalPages}`
      }}</span>
    </div>
    <hr class="line-break" />
    <div class="search__items">
      <div
        v-for="result in paginate.results"
        :key="result.ContentID"
        class="line-break"
      >
        <!-- Hardcode the URL temporary -->
        <common-text-link :to="getRedirectRoutes(result)">
          <h2 class="search__item__title">
            {{ result.Data.pageTitle }}
          </h2>
        </common-text-link>
        <p
          class="search__item__content"
          v-html="highlightResult(result.Data.content, route.query.q || '')"
        ></p>
        <hr />
      </div>
    </div>
    <common-pagination
      v-if="showPagination"
      v-model:page="state.page"
      :page-size="state.pageSize"
      :total-pages="paginate.totalPages"
    />
  </section>
  <div v-else class="search__loader">
    <common-loader />
  </div>
</template>

<script setup>
const { public: config } = useRuntimeConfig();
const route = useRoute();

const { data, refresh, pending } = await useLazyAsyncData(
  "search",
  () => {
    return $fetch(`${config.APIES_URL}/${config.projectId}`, {
      method: "POST",
      body: {
        size: 100,
        query: {
          bool: {
            must: [
              { match: { "Data.content": route.query.q || "" } },
              { match: { TemplateName: "Page" } },
            ],
          },
        },
      },
    });
  },
  { server: false, initialCache: false }
);

const state = reactive({
  page: 1,
  pageSize: 10,
  results: (data && data.value && data.value.data) || [],
});

// Handle pagination
const paginate = computed(() => {
  const pageSize = state.pageSize;
  const startIdx = pageSize * (state.page - 1);
  const results = [...state.results].splice(startIdx, pageSize);
  const totalPages = Math.max(Math.ceil(state.results.length / pageSize), 1);
  return {
    results,
    totalPages,
  };
});

// Search and Highlight Utils
// Return concat str
function concatStr(str, length, start) {
  let result = "";
  if (str.length <= length && !start) {
    return str;
  }
  if (start > 0) {
    result += "...";
  }
  result += str.substr(start, length);
  if (str.length - start > length) {
    result += "...";
  }
  return result;
}
function countOccuringText(fullText, text) {
  const pattern = new RegExp(text, "gi");
  const matchResult = fullText.match(pattern);
  return matchResult ? matchResult.length : 0;
}
// Get the most occuring search result
function getMostOccuringText(fullText, texts) {
  const maxLength = 300;
  let currentIdx = 0;
  let maxCounter = 0;
  let maxOccurenceIdx = 0;
  while (fullText.length - currentIdx > maxLength) {
    const currentSubstr = fullText.substr(currentIdx, maxLength);
    let counter = 0;
    for (const text of texts) {
      counter += countOccuringText(currentSubstr, text);
    }
    if (counter >= maxCounter) {
      maxCounter = counter;
      maxOccurenceIdx = currentIdx;
    }
    currentIdx++;
  }
  return concatStr(fullText, maxLength, maxOccurenceIdx);
}
// ExtractContent from HTML https://stackoverflow.com/a/54344724
function extractContent(htmlString) {
  if (!htmlString) return "";
  return htmlString.replace(/<[^>]+>/g, "");
}

const highlightResult = (content, target) => {
  let result = extractContent(content);
  const targetArr = target.trim().split(" ");
  result = getMostOccuringText(result, targetArr);
  targetArr.forEach((text) => {
    const pattern = new RegExp(text, "gi");
    result = result.replace(pattern, `<b>${text}</b>`);
  });
  return result;
};

const showPagination = computed(() => {
  return state.results && state.results.length > 0;
});

// Set results after data has been retrieved
watch(data, (value) => {
  state.page = 1;
  state.results = [...value.data];
});

watch(
  () => route.query,
  () => {
    refresh();
  }
);

onUnmounted(() => {
  state.results = [];
});

const getRedirectRoutes = (item) => {
  // Find routes from saved routes in the runtimeConfig
  const foundRoute = config.routes.find(
    (route) => route.ContentID === item.ContentID
  );
  if (foundRoute) {
    return foundRoute.route;
  }
};
</script>

<style lang="scss">
.search-summary {
  padding-top: 2rem;
  padding-bottom: 2rem;
  gap: 0.5rem;
  align-items: center;
  display: flex;
  flex-direction: column;

  h2 {
    color: $nimvio-blue;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

.search-summary-separator {
  display: flex;
  flex-grow: 1;
}

.line-break {
  padding-bottom: 1.25rem;
}

.search__items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search__item__title {
  color: $nimvio-blue;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 1.25rem;
}

.search__item__content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  margin-bottom: 1.25rem;
}

.search__loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

@media (min-width: 1024px) {
  .search-summary {
    flex-direction: row;
  }
}
</style>
