<template>
  <div class="scroll-progress" aria-hidden="true">
    <div class="scroll-progress-bar" :style="{ transform: `scaleX(${progress})` }"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWindowScroll, useWindowSize } from "@vueuse/core";

const { y } = useWindowScroll();
const { height } = useWindowSize();

const progress = computed(() => {
  const max = document.documentElement.scrollHeight - height.value;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, y.value / max));
});
</script>

<style lang="scss" scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 60;
  pointer-events: none;
  background: transparent;

  &-bar {
    height: 100%;
    width: 100%;
    transform-origin: 0 50%;
    background: linear-gradient(90deg, var(--accent), var(--accent-strong));
    box-shadow: 0 0 12px var(--accent-soft);
    will-change: transform;
  }
}
</style>
