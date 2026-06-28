<template>
  <div class="grain" aria-hidden="true">
    <svg class="grain-svg" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.grain {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: var(--grain-opacity);
  mix-blend-mode: overlay;

  &-svg {
    width: 100%;
    height: 100%;
  }
}
</style>
