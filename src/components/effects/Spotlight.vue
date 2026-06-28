<template>
  <div v-if="enabled" class="spotlight" aria-hidden="true" :style="style"></div>
</template>

<script setup>
import { computed } from "vue";
import { useMouse } from "@vueuse/core";
import { useReducedMotion } from "../../composables/useReducedMotion";
import { useAppStore } from "../../stores/app";
import { storeToRefs } from "pinia";

const { x, y } = useMouse({ type: "client" });
const { reducedMotion, finePointer } = useReducedMotion();
const app = useAppStore();
const { theme } = storeToRefs(app);

const enabled = computed(() => !reducedMotion.value && finePointer.value);

const style = computed(() => ({
  background: `radial-gradient(620px circle at ${x.value}px ${y.value}px, var(--accent-soft), transparent 60%)`,
}));
</script>

<style lang="scss" scoped>
.spotlight {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.8;
  transition: background 0.12s linear;
}
</style>
