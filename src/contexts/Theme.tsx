import {FC, useState, ReactNode, createContext, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {storage} from '@config/storage';

type themeType = 'light' | 'dark' | 'system';
type themeValueType = 'light' | 'dark';

interface IThemeContext {
  activeTheme: themeType;
  themeValue: themeValueType;
  changeTheme: (value: themeType) => void;
}

interface IThemeProvider {
  children: ReactNode;
}

export const ThemeContext = createContext({} as IThemeContext);

const ThemeProvider: FC<IThemeProvider> = ({children}) => {
  const scheme = useColorScheme();
  const [activeTheme, setActiveTheme] = useState<themeType>('system');
  const [themeValue, setThemeValue] = useState<themeValueType>('light');

  useEffect(() => {
    initTheme();
  }, [scheme]);

  const initTheme = async () => {
    try {
      let storageTheme = storage.getString('theme');
      if (
        storageTheme === 'system' ||
        storageTheme === null ||
        storageTheme === undefined
      ) {
        setActiveTheme('system');

        if (scheme === 'light') {
          setThemeValue('light');
        } else {
          setThemeValue('dark');
        }

        return;
      } else {
        setActiveTheme(storageTheme as themeType);
        setThemeValue(storageTheme as themeValueType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeTheme = async (value: themeType) => {
    try {
      storage.set('theme', value);
      setActiveTheme(value);

      if (value === 'system') {
        if (scheme === 'light') {
          setThemeValue('light');
        } else {
          setThemeValue('dark');
        }
      } else {
        setThemeValue(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeContext.Provider value={{activeTheme, themeValue, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
