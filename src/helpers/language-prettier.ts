export const getLanguage = (langCode: string) => {
  switch (langCode) {
    case 'tr':
      return 'Türkçe';
    case 'en':
      return 'English';
    default:
      return 'English';
  }
};
