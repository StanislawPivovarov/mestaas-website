import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

export const LANGUAGE_STORAGE_KEY = "mestaas-language";

export type Language = "ru" | "en";

export function getStoredLanguage(): Language | undefined {
  if (typeof window === "undefined") return undefined;

  const language = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return language === "ru" || language === "en" ? language : undefined;
}

export function changeAppLanguage(language: Language) {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  return i18n.changeLanguage(language);
}

void i18n
  .use(initReactI18next)
  .init({
    lng: "ru",
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: "ru",
    supportedLngs: ["ru", "en"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;