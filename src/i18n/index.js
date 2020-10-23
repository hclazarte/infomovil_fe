import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { es, en, pt } from './locales'

const options = {
  interpolation: {
    escapeValue: false // not needed for react!!
  },

  debug: true,

  lng: 'es',

  resources: {
    es: {
      common: es.es
    },
    en: {
      common: en.en
    },
    pt: {
      common: pt.pt
    }
  },

  fallbackLng: 'es',

  ns: ['common'],

  defaultNS: 'common',

  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
  }
}

i18n.use(LanguageDetector).init(options)

export default i18n
