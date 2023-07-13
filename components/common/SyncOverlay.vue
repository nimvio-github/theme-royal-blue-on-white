<template>
  <div class="sync-overlay">
    <h1>Synchronizing Data...</h1>
  </div>
</template>

<style lang="scss" scoped>
.sync-overlay {
  width: 100vw;
  height: 100vh;
  background-color: rgba(#000000, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;

  display: grid;
  place-items: center;
}
</style>
