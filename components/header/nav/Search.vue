<template>
  <a role="button" class="navbar__btn-search" aria-label="Search">
    <icon name="ic:baseline-search" size="24px" />
  </a>
</template>

<style lang="scss">
.navbar__btn-search {
  padding: 0.75rem;
  display: none;

  &:hover {
    color: $nimvio-blue;
  }
}

@media (min-width: 1024px) {
  .navbar__btn-search {
    display: flex;
  }
}
</style>
