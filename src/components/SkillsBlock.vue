<template>
  <section class="skills">
    <p class="section-label">{{ t("skills.label") }}</p>

    <div class="skills-grid">
      <div class="skills-group">
        <h3 class="skills-group-title">{{ t("skills.proficientTitle") }}</h3>
        <div class="skills-tags">
          <span v-for="(p, i) in tm('skills.proficiencies')" :key="i" class="skills-tag skills-tag--accent">{{ rt(p) }}</span>
        </div>
      </div>

      <div class="skills-group">
        <h3 class="skills-group-title">{{ t("skills.experienceTitle") }}</h3>
        <div class="skills-tags">
          <span v-for="(e, i) in tm('skills.experience')" :key="i" class="skills-tag">{{ rt(e) }}</span>
        </div>
      </div>
    </div>

    <div class="skills-languages">
      <h3 class="skills-group-title">{{ t("skills.languagesTitle") }}</h3>
      <div class="skills-languages-list">
        <ProgressBar
          v-for="(language, i) in languages"
          :key="i"
          :value="language.value"
          :max="10"
          :name="language.name"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import ProgressBar from "./library/ProgressBar.vue";

const { t, tm, rt } = useI18n({ useScope: "global" });

const languageValues = [10, 8.5, 5.5];

const languages = computed(() =>
  tm("skills.languages").map((name, index) => ({
    name: rt(name),
    value: languageValues[index],
  }))
);
</script>

<style lang="scss" scoped>
.skills {
  @include section;

  .section-label { @include section-label; }

  &-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2.5rem;
  }

  &-group-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 1rem;
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  &-tag {
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 500;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text-muted);
    transition: all 0.2s ease;

    &:hover {
      color: var(--text);
      border-color: var(--accent);
    }

    &--accent {
      background: var(--accent-soft);
      border-color: transparent;
      color: var(--accent-strong);
    }
  }

  &-languages {
    margin-top: 3rem;

    &-list {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      width: 100%;
    }
  }
}
</style>
