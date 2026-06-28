<template>
  <div class="app">
    <ScrollProgress />
    <Spotlight />
    <GrainOverlay />

    <nav class="nav" :class="{ 'nav--scrolled': scrolled }" ref="navRoot">
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
            :model-value="app.locale"
            :options="localeOptions"
            @update:model-value="app.changeLocale"
          >
            <template #trigger>{{ app.locale.toUpperCase() }}</template>
          </Dropdown>
          <Button
            :icon="app.theme === 'light' ? 'moon' : 'sun'"
            :aria-label="app.theme === 'light' ? t('app.theme.toDark') : t('app.theme.toLight')"
            @click="app.toggleTheme"
          />
          <div class="nav-burger">
            <Button
              :icon="mobileMenuOpen ? 'xmark' : 'bars'"
              :aria-label="t('app.nav.menu')"
              :aria-expanded="mobileMenuOpen"
              @click="mobileMenuOpen = !mobileMenuOpen"
            />
          </div>
        </div>
      </div>
      <div v-if="mobileMenuOpen" class="nav-mobile">
        <span
          v-for="block in blocks"
          :key="block.key"
          class="nav-mobile-link"
          @click="scrollToBlock(block.key)"
          >{{ t(`app.nav.${block.key}`) }}</span
        >
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
import Lenis from "lenis";

import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { useWindowScroll } from "@vueuse/core";
import { useAppStore } from "./stores/app";
import { useReducedMotion } from "./composables/useReducedMotion";

import Button from "./components/library/Button.vue";
import Dropdown from "./components/library/Dropdown.vue";

import Header from "./components/Header.vue";
import EducationBlock from "./components/EducationBlock.vue";
import ExperienceBlock from "./components/ExperienceBlock.vue";
import SkillsBlock from "./components/SkillsBlock.vue";
import HobbyBlock from "./components/HobbyBlock.vue";
import QuotesBlock from "./components/QuotesBlock.vue";

import ScrollProgress from "./components/effects/ScrollProgress.vue";
import Spotlight from "./components/effects/Spotlight.vue";
import GrainOverlay from "./components/effects/GrainOverlay.vue";

const { t } = useI18n({ useScope: "global" });
const app = useAppStore();
const { reducedMotion } = useReducedMotion();

const { y: scrollY } = useWindowScroll();
const scrolled = computed(() => scrollY.value > 24);

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

const navRoot = ref(null);
const mobileMenuOpen = ref(false);

let lenis = null;
let rafId = null;

function handleClickOutside(event) {
  if (
    mobileMenuOpen.value &&
    navRoot.value &&
    !navRoot.value.contains(event.target)
  ) {
    mobileMenuOpen.value = false;
  }
}

const localeOptions = computed(() =>
  app.supportedLocales.map((code) => ({
    value: code,
    label: code.toUpperCase(),
    description: t(`common.languages.${code}`),
  }))
);

onMounted(() => {
  app.initTheme();
  app.initLocale();
  document.addEventListener("click", handleClickOutside);

  if (!reducedMotion.value) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  if (rafId) cancelAnimationFrame(rafId);
  if (lenis) lenis.destroy();
});

function scrollToBlock(key) {
  mobileMenuOpen.value = false;
  const element = blockRefs[key].value.$el;
  if (lenis) {
    lenis.scrollTo(element, { offset: -50 });
  } else {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
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
  background: color-mix(in srgb, var(--bg) 55%, transparent);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &--scrolled {
    background: color-mix(in srgb, var(--bg) 82%, transparent);
    backdrop-filter: saturate(180%) blur(14px);
    border-bottom-color: var(--border);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
  }

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
    display: inline-block;
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

  &-burger {
    display: none;
  }

  &-mobile {
    display: flex;
    flex-direction: column;
    max-width: 880px;
    margin: 0 auto;
    padding: 0.4rem 1.25rem 1rem;
    border-top: 1px solid var(--border);

    &-link {
      padding: 0.7rem 0;
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text-muted);
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--text);
      }
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

@media (max-width: 750px) {
  .nav-links {
    display: none;
  }
  .nav-burger {
    display: inline-flex;
  }
}
</style>
