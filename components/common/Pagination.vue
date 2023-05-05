<template>
  <div class="pagination-wrapper">
    <div class="pagination-buttons">
      <button
        class="pagination-button"
        :disabled="computedPage === 1"
        @click="first"
      >
        <icon name="mdi-chevron-double-left" size="1.5rem" />
      </button>
      <button
        class="pagination-button"
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
        class="pagination-input"
        type="text"
      />
      of {{ props.totalPages }}
    </div>
    <div class="pagination-buttons">
      <button
        class="pagination-button"
        :disabled="computedPage === props.totalPages"
        @click="next"
      >
        <icon name="mdi-chevron-right" size="1.5rem" />
      </button>
      <button
        class="pagination-button"
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

<style lang="scss">
.pagination-wrapper {
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  display: flex;
}

.pagination-buttons {
  display: flex;
}

.pagination-button {
  color: $nimvio-white;
  padding-left: 0px;
  padding-right: 0px;
  background-color: $nimvio-blue;
  border-width: 1px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    background-color: $nimvio-blue;
    cursor: default;
  }

  &:hover {
    background-color: $nimvio-blue;
  }
}

.pagination-input {
  text-align: center;
  width: 2rem;
  border: 1px solid $nimvio-gray;
}
</style>
