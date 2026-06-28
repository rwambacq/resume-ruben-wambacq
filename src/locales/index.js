import { createI18n } from "vue-i18n";

export const SUPPORTED_LOCALES = ["en", "nl", "fr", "de"];
export const DEFAULT_LOCALE = "en";

const modules = import.meta.globEager("./*/*.js");
const messages = {};

for (const path in modules) {
  const match = path.match(/\.\/([^/]+)\/([^/]+)\.js$/);
  if (!match) continue;
  const [, locale, block] = match;
  (messages[locale] ??= {})[block] = modules[path].default;
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  warnHtmlMessage: false,
  messages,
});

export default i18n;
