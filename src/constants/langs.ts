interface ILangs {
  i18nCode: languageType;
  isoCode: string;
  text: string;
}

export const langs: ILangs[] = [
  {
    i18nCode: 'en',
    isoCode: 'us',
    text: 'English',
  },
  {
    i18nCode: 'tr',
    isoCode: 'tr',
    text: 'Türkçe',
  },
];
