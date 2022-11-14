<template>
  <div class="hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped>
.hamburger {
  cursor: pointer;
  display: block;
  height: 3rem;
  position: relative;
  width: 3rem;
  margin-left: auto;
}

.hamburger span {
  background-color: currentColor;
  display: block;
  height: 1px;
  left: calc(50% - 8px);
  position: absolute;
  transform-origin: center;
  transition-duration: 86ms;
  transition-property: background-color, opacity, transform;
  transition-timing-function: ease-out;
  width: 16px;
  font-style: inherit;
  font-weight: inherit;
}

.hamburger span:nth-child(1) {
  top: calc(50% - 5px);
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.hamburger span:nth-child(2) {
  top: calc(50% - 0px);
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.hamburger span:nth-child(3) {
  top: calc(50% + 6px);
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg);
}
</style>
