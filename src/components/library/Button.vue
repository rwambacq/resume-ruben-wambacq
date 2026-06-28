<template>
  <component :is="tag" class="button" :class="`button--${variant}`" v-bind="attrs">
    <span v-if="icon" class="button-icon">
      <font-awesome-icon :icon="icon" />
    </span>
    <span v-if="$slots.default" class="button-label"><slot /></span>
    <slot name="append" />
  </component>
</template>

<script setup>
import { computed, useAttrs, useSlots } from "vue";

const props = defineProps({
  icon: {
    type: [String, Array],
    default: null,
  },
});

const attrs = useAttrs();
const slots = useSlots();

const tag = computed(() => (attrs.href != null ? "a" : "button"));

const variant = computed(() => (slots.default ? "pill" : "icon"));
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 999px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &--pill {
    padding: 0.55rem 1rem;
  }

  &--icon {
    width: 2.2rem;
    height: 2.2rem;
    padding: 0;
    border-radius: 50%;
  }

  &-icon {
    display: inline-flex;
    color: var(--text-muted);
    transition: color 0.2s ease;
    height: 1.2rem;
    width: 1.2rem;
    font-size: 1.1rem;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
    transform: translateY(-1px);
    box-shadow: var(--shadow);

    .button-icon {
      color: var(--accent);
    }
  }
}
</style>
