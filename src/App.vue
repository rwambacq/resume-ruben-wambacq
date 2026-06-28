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
          <div class="lang" ref="langMenu">
            <button
              class="lang-toggle"
              :aria-label="t('app.language.label')"
              :aria-expanded="langOpen"
              @click="langOpen = !langOpen"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span class="lang-current">{{ locale.toUpperCase() }}</span>
            </button>
            <ul v-if="langOpen" class="lang-menu">
              <li
                v-for="code in locales"
                :key="code"
                :class="{ 'lang-option': true, active: code === locale }"
                @click="changeLocale(code)"
              >
                <span class="lang-code">{{ code.toUpperCase() }}</span>
                <span class="lang-name">{{ t(`common.languages.${code}`) }}</span>
              </li>
            </ul>
          </div>
          <button
            class="nav-toggle"
            :aria-label="theme === 'light' ? t('app.theme.toDark') : t('app.theme.toLight')"
            @click="toggleTheme"
          >
          <svg
            v-if="theme === 'light'"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            />
          </svg>
          </button>
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { SUPPORTED_LOCALES, setLocale } from "./locales";
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

const locales = SUPPORTED_LOCALES;
const langOpen = ref(false);
const langMenu = ref(null);

function changeLocale(code) {
  setLocale(code);
  langOpen.value = false;
}

function handleClickOutside(event) {
  if (langMenu.value && !langMenu.value.contains(event.target)) {
    langOpen.value = false;
  }
}

onMounted(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme.value = stored || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme.value);
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
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

  &-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.2s ease,
      color 0.2s ease;

    &:hover {
      color: var(--accent);
      transform: translateY(-1px);
    }
  }
}

.lang {
  position: relative;

  &-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    height: 2.2rem;
    padding: 0 0.7rem;
    border-radius: 999px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    cursor: pointer;
    transition:
      color 0.2s ease,
      transform 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      color: var(--accent);
      border-color: var(--accent);
      transform: translateY(-1px);
    }
  }

  &-current {
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
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
      background: var(--surface-2);
      color: var(--text);
    }

    &.active {
      color: var(--accent-strong);
      background: var(--accent-soft);
    }
  }

  &-code {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    width: 1.6rem;
    flex-shrink: 0;
  }

  &-name {
    font-size: 0.88rem;
    font-weight: 500;
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
