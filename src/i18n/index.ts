import i18n from "i18next";
import transEn from "./locales/en/index";
import transVi from "./locales/vi/index";

export const languageResources = {
  vi: {
    trans: transVi,
  },
  en: {
    trans: transEn,
  },
};

i18n.init({
  // debug: true,

  resources: languageResources,
  lng: "vi",
  fallbackLng: "vi",

  interpolation: {
    escapeValue: false,
  },
  ns: "trans",
  react: {
    bindI18n: "languageChanged loaded",
    nsMode: "default",
  },
});

export default i18n;

// DANGER, you should use t from useLanguage, to make sure components render when
export const _t = i18n.t.bind(i18n);

// Key of t
export const tk = (key: NestedObjectLessPaths<ILanguageJson>) => key;

export type ILanguageAreas = keyof typeof transVi;
export type ILanguageJson = typeof transVi;
export type ILanguageCodes = keyof typeof languageResources;
