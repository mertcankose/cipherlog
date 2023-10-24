import "@react-navigation/native";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      text: string;
      pale: string;
      accountItem: string;
      sheetBg: string;
      urgent: string;
      medium: string;
      normal: string;
      none: string;
      inputSelection: string;
      inputPlaceholder: string;
      trashBg: string;
      noteItem: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}
