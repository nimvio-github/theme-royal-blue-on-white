<template>
  <div class="flex gap-2 justify-center items-center">
    <div class="flex">
      <button
        class="bg-royal-blue hover:bg-dark-blue text-white border px-0 disabled:bg-royal-blue disabled:opacity-50"
        :disabled="computedPage === 1"
        @click="first"
      >
        <icon name="mdi-chevron-double-left" size="1.5rem" />
      </button>
      <button
        class="bg-royal-blue hover:bg-dark-blue text-white border px-0 disabled:bg-royal-blue disabled:opacity-50"
        :disabled="computedPage === 1"
        @click="prev"
      >
        <icon name="mdi-chevron-left" size="1.5rem" />
      </button>
    </div>
    <div>
      Page
      <input
        v-model.number="computedPage"
        class="w-8 border border-gray-300 text-center"
        type="text"
      />
      of {{ props.totalPages }}
    </div>
    <div class="flex">
      <button
        class="bg-royal-blue hover:bg-dark-blue text-white border px-0 disabled:bg-royal-blue disabled:opacity-50"
        :disabled="computedPage === props.totalPages"
        @click="next"
      >
        <icon name="mdi-chevron-right" size="1.5rem" />
      </button>
      <button
        class="bg-royal-blue hover:bg-dark-blue text-white border px-0 disabled:bg-royal-blue disabled:opacity-50"
        :disabled="computedPage === props.totalPages"
        @click="last"
      >
        <icon name="mdi-chevron-double-right" size="1.5rem" />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:page"]);

const computedPage = computed({
  get() {
    return props.page;
  },
  set(value) {
    emit("update:page", value);
  },
});

const next = () => computedPage.value++;
const prev = () => computedPage.value--;
const first = () => (computedPage.value = 1);
const last = () => (computedPage.value = props.totalPages);
</script>
