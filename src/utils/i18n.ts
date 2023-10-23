import i18n, {LanguageDetectorModule} from 'i18next';
import {Platform, NativeModules} from 'react-native';
import {initReactI18next} from 'react-i18next';
import en from '@lang/en.json';
import tr from '@lang/tr.json';

const RNLanguageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: () => {
    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    return locale.split('_')[0];
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: en,
      tr: tr,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
