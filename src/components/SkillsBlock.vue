<template>
  <section class="skills">
    <p class="section-label">Skills</p>

    <div class="skills-grid">
      <div class="skills-group">
        <h3 class="skills-group-title">Proficient with</h3>
        <div class="skills-tags">
          <span v-for="(p, i) in proficiencies" :key="i" class="skills-tag skills-tag--accent">{{ p }}</span>
        </div>
      </div>

      <div class="skills-group">
        <h3 class="skills-group-title">Experience with</h3>
        <div class="skills-tags">
          <span v-for="(e, i) in experience" :key="i" class="skills-tag">{{ e }}</span>
        </div>
      </div>
    </div>

    <div class="skills-languages">
      <h3 class="skills-group-title">Languages</h3>
      <div class="skills-languages-list">
        <ProgressBar
          v-for="(language, i) in Object.keys(languages)"
          :key="i"
          :value="languages[language]"
          :max="10"
          :name="language"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProgressBar from "./visualisation/ProgressBar.vue";

const proficiencies = [
  "Vue.js",
  "Javascript",
  "Typescript",
  "UI design",
  "UX design",
];
const experience = [
  "Mobile development",
  "React Native",
  "React",
  "Angular",
  "Ember",
  "Python",
  "SQL",
  "Linked Data",
];
const languages = {
  Dutch: 10,
  English: 8.5,
  French: 5.5,
};
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
