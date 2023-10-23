import {FC, ReactNode, useState, createContext, useEffect} from 'react';
import {Platform, NativeModules, ErrorHandlerCallback} from 'react-native';
import {storage} from '@config/storage';
import {useTranslation} from 'react-i18next';

interface ILangContext {
  currentLanguage: string;
  changeLanguage: (value: languageType) => void;
}

interface IContextProvider {
  children: ReactNode;
}

export const LangContext = createContext({} as ILangContext);

const LangProvider: FC<IContextProvider> = ({children}) => {
  const {i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<languageType>('en');

  useEffect(() => {
    languageControl();
  }, []);

  const languageControl = async () => {
    const language = storage.getString('language');
    if (language === null || language === undefined) {
      deviceLanguageControl();
    } else {
      changeLanguage(language as languageType);
    }
  };

  const getDeviceLanguage = () => {
    let deviceLocalLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    return deviceLocalLanguage;
  };

  const deviceLanguageControl = async () => {
    if (getDeviceLanguage().includes('tr')) {
      changeLanguage('tr');
    } else {
      changeLanguage('en');
    }
  };

  const changeLanguage = (lang: languageType) => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        setCurrentLanguage(lang as languageType);
        storage.set('language', lang);
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  return (
    <LangContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
      }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
