<template>
  <section class="hobbies">
    <p class="section-label">{{ t("hobbies.label") }}</p>
    <div class="hobbies-list">
      <span v-for="(hobby, index) in hobbies" :key="index" class="hobbies-item">
        <span class="hobbies-icon" v-html="hobby.icon"></span>
        {{ hobby.name }}
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
    transition: transform 0.2s ease, border-color 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      border-color: var(--accent);
    }
  }

  &-icon {
    font-size: 1.05rem;
    line-height: 1;
  }
}
</style>
