import { defineStore } from "pinia";
import { ref } from "vue";
import i18n, { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "../locales";

const THEME_STORAGE_KEY = "theme";
const LOCALE_STORAGE_KEY = "locale";

export const useAppStore = defineStore("app", () => {
  const theme = ref("light");

  function applyTheme(value) {
    theme.value = value;
    document.documentElement.setAttribute("data-theme", value);
  }

  function initTheme() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(stored || (prefersDark ? "dark" : "light"));
  }

  function toggleTheme() {
    const next = theme.value === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  // Locale — i18n owns the reactive value; the store mirrors it to the DOM and localStorage.
  const locale = i18n.global.locale;

  function applyLocale(value) {
    i18n.global.locale.value = value;
    document.documentElement.setAttribute("lang", value);
  }

  function initLocale() {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      applyLocale(stored);
      return;
    }
    const browser = navigator.language?.split("-")[0];
    applyLocale(
      browser && SUPPORTED_LOCALES.includes(browser) ? browser : DEFAULT_LOCALE
    );
  }

  function changeLocale(code) {
    if (!SUPPORTED_LOCALES.includes(code)) return;
    applyLocale(code);
    localStorage.setItem(LOCALE_STORAGE_KEY, code);
  }

  return {
    theme,
    locale,
    supportedLocales: SUPPORTED_LOCALES,
    initTheme,
    toggleTheme,
    initLocale,
    changeLocale,
  };
});
