<template>
  <div class="app">
    <nav class="nav">
      <div class="nav-inner">
        <span class="nav-brand" @click="scrollToTop">RW</span>
        <div class="nav-links">
          <span
            v-for="(block, index) in blocks"
            :key="index"
            class="nav-link"
            @click="scrollToBlock(block)"
            >{{ block }}</span
          >
        </div>
        <button
          class="nav-toggle"
          :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
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
      <p>Designed &amp; built by Ruben Wambacq</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "./components/Header.vue";
import EducationBlock from "./components/EducationBlock.vue";
import ExperienceBlock from "./components/ExperienceBlock.vue";
import SkillsBlock from "./components/SkillsBlock.vue";
import HobbyBlock from "./components/HobbyBlock.vue";
import QuotesBlock from "./components/QuotesBlock.vue";

const blocks = ["Education", "Experience", "Skills", "Hobbies", "References"];

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

onMounted(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme.value = stored || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme.value);
});

function scrollToBlock(block) {
  const element = blockRefs[block.toLowerCase()].value.$el;
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
