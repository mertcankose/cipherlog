export const themePrettier = (theme: string) => {
  switch (theme) {
    case 'system':
      return 'system';
    case 'light':
      return 'light';
    case 'dark':
      return 'dark';

    default:
      return 'System';
  }
};
