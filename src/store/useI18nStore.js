// src/store/useI18nStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

import es from "../i18n/es";
import en from "../i18n/en";
import de from "../i18n/de";

const dictionaries = { es, en, de };

export const useI18nStore = create(
  persist(
    (set, get) => ({
      lang: "en",
      dict: dictionaries.en,

      setLang: (lang) => {
        if (!dictionaries[lang]) return;

        set({
          lang,
          dict: dictionaries[lang],
        });
      },

      tr: (path) => {
        const keys = path.split(".");
        let value = get().dict;

        for (const k of keys) {
          value = value?.[k];
        }

        return value ?? path;
      },
    }),
    {
      name: "i18n-storage", // nombre del almacenamiento
    }
  )
);
