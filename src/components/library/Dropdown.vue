<template>
  <div class="dropdown" ref="root">
    <Button
      :icon="icon"
      :aria-label="ariaLabel"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span v-if="$slots.trigger" class="dropdown-trigger"
        ><slot name="trigger"
      /></span>
    </Button>
    <ul v-if="open" class="dropdown-menu">
      <li
        v-for="option in options"
        :key="option.value"
        :class="{
          'dropdown-option': true,
          active: option.value === modelValue,
        }"
        @click="select(option.value)"
      >
        <span class="dropdown-option-label">{{ option.label }}</span>
        <span v-if="option.description" class="dropdown-option-description">{{
          option.description
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Button from "./Button.vue";

import { ref, onMounted, onBeforeUnmount } from "vue";

defineProps({
  modelValue: { type: [String, Number], default: null },
  options: { type: Array, required: true },
  icon: { type: [String, Array], default: null },
  ariaLabel: { type: String, default: null },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const root = ref(null);

function select(value) {
  emit("update:modelValue", value);
  open.value = false;
}

function handleClickOutside(event) {
  if (root.value && !root.value.contains(event.target)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside),
);
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  &-trigger {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  &-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 11rem;
    padding: 0.4rem;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    z-index: 60;
    list-style: none;
    margin: 0;
  }

  &-option {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.55rem 0.7rem;
    border-radius: 8px;
    cursor: pointer;
    color: var(--text-muted);
    transition:
      background 0.15s ease,
      color 0.15s ease;

    &:hover {
      background: var(--surface-2);
      color: var(--text);
    }

    &.active {
      color: var(--accent-strong);
      background: var(--accent-soft);
    }

    &-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      width: 1.6rem;
      flex-shrink: 0;
    }

    &-description {
      font-size: 0.88rem;
      font-weight: 500;
    }
  }
}
</style>
