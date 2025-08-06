// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import am from './locales/am.json';
import om from './locales/om.json';
import ti from './locales/ti.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: { translation: en },
      am: { translation: am },
      om: { translation: om },
      ti: { translation: ti },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
