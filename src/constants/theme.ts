import {DefaultTheme, DarkTheme, ExtendedTheme} from '@react-navigation/native';

const NoteDefaultTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F5F7F8',
    text: '#000',
    primary: '#279EFF',
    accountItem: '#EEEEEE',
    noteItem: '#F0F0F0',
    pale: '#7D7C7C',
    sheetBg: '#FFF',
    urgent: '#ef4444',
    medium: '#279EFF',
    normal: '#1f2937',
    none: '#6b7280',
    inputSelection: '#279EFF',
    inputPlaceholder: '#7D7C7C',
    trashBg: '#FE0000',
    paginationDisabled: '#7D7C7C',
    loadingOverlayBg: '#FFF6F6',
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
    noteItem: '#F6F1EE',
    pale: '#F5F7F8',
    sheetBg: '#61677A',
    urgent: '#ef4444',
    medium: '#279EFF',
    normal: '#1f2937',
    none: '#6b7280',
    inputSelection: '#D8D9DA',
    inputPlaceholder: '#D8D9DA',
    trashBg: '#FE0000',
    paginationDisabled: '#7D7C7C',
    loadingOverlayBg: '#FFF6F6',
  },
};

export {NoteDefaultTheme, NoteDarkTheme};
