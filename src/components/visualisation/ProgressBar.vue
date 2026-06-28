<template>
  <div class="progress-bar">
    <div class="progress-bar-head">
      <span v-if="name !== ''" class="progress-bar-name">{{ name }}</span>
    </div>
    <div class="progress-bar-track" v-visible="visibilityChanged">
      <div class="progress-bar-fill" :style="progressBarFill"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  value: { type: Number, required: true },
  max: { type: Number, required: true },
  name: { type: String, default: "" },
});

const canAnimate = ref(false);

const progressBarFill = computed(() => {
  const ratio = canAnimate.value
    ? Math.round((props.value / props.max) * 100)
    : 0;
  return `width: ${ratio}%`;
});

function visibilityChanged(isVisible) {
  if (isVisible) canAnimate.value = true;
}
</script>

<style lang="scss" scoped>
.progress-bar {
  &-head {
    display: flex;
    margin-bottom: 0.45rem;
  }

  &-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text);
  }

  &-track {
    height: 8px;
    border-radius: 999px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    overflow: hidden;
  }

  &-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--accent), var(--accent-strong));
    transition: width 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  }
}
</style>
