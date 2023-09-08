
import i18n from "i18next";
import {initReactI18next } from "react-i18next";

import tEn from '../locales/en/translation.json';
import tHi from '../locales/hi/translation.json';
import tOd from '../locales/od/translation.json';
import tMa from '../locales/ma/translation.json';


import tGu from '../locales/gu/translation.json';


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: tEn
      },
      hi: {
        translation: tHi
      },
      od: {
        translation: tOd
      },
      ma: {
        translation: tMa
      },
      gu: {
        translation: tGu
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

