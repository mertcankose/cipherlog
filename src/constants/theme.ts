import {DefaultTheme, DarkTheme, ExtendedTheme} from '@react-navigation/native';

const NoteDefaultTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F5F7F8',
    text: '#000',
    primary: '#279EFF',
    accountItem: '#EEEEEE',
    pale: '#7D7C7C',
    sheetBg: '#FFF',
  },
};

const NoteDarkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#272829',
    text: '#fff',
    primary: '#279EFF',
    accountItem: '#61677A',
    pale: '#F5F7F8',
    sheetBg: '#61677A',
  },
};

export {NoteDefaultTheme, NoteDarkTheme};
