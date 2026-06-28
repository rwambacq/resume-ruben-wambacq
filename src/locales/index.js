import { createI18n } from "vue-i18n";

export const SUPPORTED_LOCALES = ["en", "nl", "fr", "de"];

const DEFAULT_LOCALE = "en";
const STORAGE_KEY = "locale";

const modules = import.meta.globEager("./*/*.js");
const messages = {};
for (const path in modules) {
  const match = path.match(/\.\/([^/]+)\/([^/]+)\.js$/);
  if (!match) continue;
  const [, locale, block] = match;
  (messages[locale] ??= {})[block] = modules[path].default;
}

function resolveInitialLocale() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;

  const browser = navigator.language?.split("-")[0];
  if (browser && SUPPORTED_LOCALES.includes(browser)) return browser;

  return DEFAULT_LOCALE;
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: resolveInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  warnHtmlMessage: false,
  messages,
});

export function setLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) return;
  i18n.global.locale.value = locale;
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.setAttribute("lang", locale);
}

document.documentElement.setAttribute("lang", i18n.global.locale.value);

export default i18n;
