<template>
  <div class="app">
    <nav class="nav">
      <div class="nav-inner">
        <span class="nav-brand" @click="scrollToTop">RW</span>
        <div class="nav-links">
          <span
            v-for="block in blocks"
            :key="block.key"
            class="nav-link"
            @click="scrollToBlock(block.key)"
            >{{ t(`app.nav.${block.key}`) }}</span
          >
        </div>
        <div class="nav-actions">
          <Dropdown
            icon="globe"
            :aria-label="t('app.language.label')"
            :model-value="locale"
            :options="localeOptions"
            @update:model-value="changeLocale"
          >
            <template #trigger>{{ locale.toUpperCase() }}</template>
          </Dropdown>
          <Button
            :icon="theme === 'light' ? 'moon' : 'sun'"
            :aria-label="theme === 'light' ? t('app.theme.toDark') : t('app.theme.toLight')"
            @click="toggleTheme"
          />
        </div>
      </div>
    </nav>

    <Header />

    <main class="app-content">
      <EducationBlock ref="education" />
      <ExperienceBlock ref="experience" />
      <SkillsBlock ref="skills" />
      <HobbyBlock ref="hobbies" />
      <QuotesBlock ref="references" />
    </main>

    <footer class="footer">
      <p>{{ t("app.footer") }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { SUPPORTED_LOCALES, setLocale } from "./locales";

import Button from "./components/library/Button.vue";
import Dropdown from "./components/library/Dropdown.vue";
import Header from "./components/Header.vue";
import EducationBlock from "./components/EducationBlock.vue";
import ExperienceBlock from "./components/ExperienceBlock.vue";
import SkillsBlock from "./components/SkillsBlock.vue";
import HobbyBlock from "./components/HobbyBlock.vue";
import QuotesBlock from "./components/QuotesBlock.vue";

const { t, locale } = useI18n({ useScope: "global" });

const blocks = [
  { key: "education" },
  { key: "experience" },
  { key: "skills" },
  { key: "hobbies" },
  { key: "references" },
];

const education = ref(null);
const experience = ref(null);
const skills = ref(null);
const hobbies = ref(null);
const references = ref(null);

const blockRefs = { education, experience, skills, hobbies, references };

const theme = ref("light");

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme.value);
  localStorage.setItem("theme", theme.value);
}

const localeOptions = computed(() =>
  SUPPORTED_LOCALES.map((code) => ({
    value: code,
    label: code.toUpperCase(),
    description: t(`common.languages.${code}`),
  }))
);

function changeLocale(code) {
  setLocale(code);
}

onMounted(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme.value = stored || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme.value);
});

function scrollToBlock(key) {
  const element = blockRefs[key].value.$el;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style lang="scss">
.app {
  position: relative;
  min-height: 100vh;
}

.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--border);

  &-inner {
    max-width: 880px;
    margin: 0 auto;
    padding: 0.9rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &-brand {
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.04em;
    color: var(--accent);
    cursor: pointer;
  }

  &-links {
    display: flex;
    gap: 1.6rem;
  }

  &-link {
    position: relative;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    transition: color 0.2s ease;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 0;
      height: 2px;
      border-radius: 2px;
      background: var(--accent);
      transition: width 0.25s ease;
    }

    &:hover {
      color: var(--text);
      &::after {
        width: 100%;
      }
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
}

.app-content > * {
  scroll-margin-top: 4.5rem;
}

.footer {
  border-top: 1px solid var(--border);
  text-align: center;
  padding: 2.5rem 1.25rem;
  color: var(--text-faint);
  font-size: 0.82rem;
}

@media (max-width: 640px) {
  .nav-links {
    gap: 1rem;
  }
  .nav-link {
    font-size: 0.8rem;
  }
}
</style>
