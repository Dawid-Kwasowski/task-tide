import { createI18n } from "vue-i18n";
import { messages } from "@/locales/messages";

const storedLocale: string | null = localStorage.getItem("locale");

export const i18n = createI18n({
  legacy: false,
  locale: storedLocale || navigator.language,
  fallbackLocale: "en-EN",
  messages,
});
