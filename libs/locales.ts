import axios from 'axios';
import i18n from 'i18n-js';
import { StoreKey, Locales } from 'types';

export const getNavigatorLocale = () => {
  try {
    const locale =
      typeof navigator === 'undefined'
        ? 'en'
        : navigator.language.split('-')[0];
    return locale;
  } catch (e) {
    console.error(e);
    return 'en';
  }
};

export const getLocaleTextsKey = (locale: Locales) => {
  return StoreKey.LocaleTexts + '_' + locale;
};
export const getSavedLocale = async () => {
  const value = localStorage.getItem(StoreKey.Locale);
  return value as Locales | null;
};
export const saveLocale = async (lang: Locales | null) => {
  if (lang) {
    localStorage.setItem(StoreKey.Locale, lang);
  } else {
    localStorage.removeItem(StoreKey.Locale);
  }
};
export const getLocaleTextsFromServerAndSaveToStorage = async (
  locale: Locales
) => {
  const localeTexts = (
    await axios.get(`https://static.getraffle.io/translate/${locale}.json`, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  ).data;
  if (localeTexts)
    localStorage.setItem(
      getLocaleTextsKey(locale),
      JSON.stringify(localeTexts)
    );
  return localeTexts;
};
export const getLocaleTextsFromStorage = async (locale: Locales) => {
  const localeTexts = localStorage.getItem(getLocaleTextsKey(locale));
  return localeTexts ? JSON.parse(localeTexts) : null;
};
export const setLocaleDataToI18nButWithoutRerender = (
  locale: Locales,
  localeTexts: any
) => {
  i18n.translations[locale] = localeTexts;
  i18n.locale = locale;
};

// renew가 true이면 무조건 서버에서 불러온다.
type GetAndSetLocaleDataOptions = {
  renew?: boolean;
};
export const getAndSetLocaleData = async (
  locale: Locales,
  options: GetAndSetLocaleDataOptions = { renew: false }
) => {
  // 스토리지나 서버에서 불러와서 i18n에 세팅
  let localeTexts = getLocaleTextsFromStorage(locale);
  if (!localeTexts || options?.renew) {
    const dataFromServer = await getLocaleTextsFromServerAndSaveToStorage(
      locale
    );
    if (dataFromServer) {
      localeTexts = dataFromServer;
    }
  }
  setLocaleDataToI18nButWithoutRerender(locale, localeTexts);
};
