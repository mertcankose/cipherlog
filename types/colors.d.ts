import '@react-navigation/native';

declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      text: string;
      // tertiary: string;
      // danger: string;
      // background: string;
      // card: string;
      // text: string;
      // subtext: string;
      // separator: string;
      // border: string;
      // highlight: string;
      // notification: string;
      pale: string;
      accountItem: string;
      sheetBg: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}
