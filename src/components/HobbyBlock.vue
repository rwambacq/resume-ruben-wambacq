<template>
  <section class="hobbies">
    <p class="section-label" data-num="04">{{ t("hobbies.label") }}</p>
    <div class="hobbies-list">
      <span
        v-for="(hobby, index) in hobbies"
        :key="index"
        class="hobbies-cell"
        v-reveal
        :style="{ '--reveal-delay': `${index * 0.07}s` }"
      >
        <span class="hobbies-item">
          <span class="hobbies-icon" v-html="hobby.icon"></span>
          {{ hobby.name }}
        </span>
      </span>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm, rt } = useI18n({ useScope: "global" });

const icons = ["🪚", "🍳", "✏️", "🎲", "🎮"];

const hobbies = computed(() =>
  tm("hobbies.items").map((name, index) => ({
    name: rt(name),
    icon: icons[index],
  }))
);
</script>

<style lang="scss" scoped>
.hobbies {
  @include section;

  .section-label { @include section-label; }

  &-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  &-cell {
    display: inline-flex;
  }

  &-item {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.6rem 1.1rem;
    border-radius: 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--text);
    transition: transform 0.3s var(--ease-cinematic), border-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
      box-shadow: var(--glow), var(--shadow);
    }
  }

  &-icon {
    font-size: 1.05rem;
    line-height: 1;
  }
}
</style>
