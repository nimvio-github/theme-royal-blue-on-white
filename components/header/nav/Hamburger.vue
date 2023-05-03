<template>
  <div class="navbar__hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style>
.navbar__hamburger {
  cursor: pointer;
  display: block;
  height: 3rem;
  position: relative;
  width: 3rem;
  margin-left: auto;
}

.navbar__hamburger span {
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

.navbar__hamburger span:nth-child(1) {
  top: calc(50% - 5px);
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.navbar__hamburger span:nth-child(2) {
  top: calc(50% - 0px);
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.navbar__hamburger span:nth-child(3) {
  top: calc(50% + 6px);
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.navbar__hamburger.open span:nth-child(1) {
  transform: rotate(45deg);
}

.navbar__hamburger.open span:nth-child(2) {
  opacity: 0;
}

.navbar__hamburger.open span:nth-child(3) {
  transform: rotate(-45deg);
}

@media (min-width: 1024px) {
  .navbar__hamburger {
    display: none;
  }
}
</style>
