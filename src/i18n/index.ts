import i18n from 'i18n-js';
import vi from './locales/vi';
import moment from 'moment';

const translations = { en: vi, vi };

type AvailableLanguage = keyof typeof translations;

const setI18nConfig = () => {
  const defaultLocale = 'vi';
  moment.locale(defaultLocale);
  i18n.fallbacks = true;
  i18n.translations = translations;
  i18n.locale = defaultLocale;
  i18n.defaultLocale = defaultLocale;
  i18n.missingTranslation = () => '';
};

const getLocale = () => i18n.currentLocale() as AvailableLanguage;

const t = (key: string, options?: i18n.TranslateOptions | undefined) => {
  return i18n.t(key, options);
};
const switchLanguage = async (toLanguage: AvailableLanguage) => {
  // await setItem(keys.locale, toLanguage);
};

export default i18n;

export { translations, t, getLocale, switchLanguage, setI18nConfig };
