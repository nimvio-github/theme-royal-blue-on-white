<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <section v-if="data && !pending" class="container">
    <div class="flex items-center flex-col lg:flex-row gap-2 py-8">
      <h2 class="text-2xl font-bold text-royal-blue">
        {{
          `${data.totalItems} ${
            data.totalItems > 1 ? "results" : "result"
          } for '${route.query.q || ""}'`
        }}
      </h2>
      <div class="grow"></div>
      <span v-if="showPagination">{{
        `Page ${state.page} of ${paginate.totalPages}`
      }}</span>
    </div>
    <hr class="pb-5" />
    <div class="flex flex-col gap-4">
      <div
        v-for="result in paginate.results"
        :key="result.ContentID"
        class="pb-5"
      >
        <!-- Hardcode the URL temporary -->
        <common-text-link :to="getRedirectRoutes(result)">
          <h2 class="text-2xl text-royal-blue font-bold mb-5">
            {{ result.Data.pageTitle }}
          </h2>
        </common-text-link>
        <p
          class="line-clamp-4 mb-5"
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
  <div v-else class="h-[50vh] flex items-center justify-center">
    <common-loader />
  </div>
</template>

<script setup>
// import config from "~~/helpers/config";

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
