import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: require('./locales/en-US.json')
  }
};

i18n.use(LanguageDetector).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
});

export const _t = (k, args = {}) => {
  return i18n.t(k, args);
};
