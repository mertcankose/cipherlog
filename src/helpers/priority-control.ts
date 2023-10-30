export const priorityPrettier = (priority: number) => {
  switch (priority) {
    case 0:
      return 'None';
    case 1:
      return 'Normal';
    case 2:
      return 'Medium';
    case 3:
      return 'Urgent';
    default:
      return 'None';
  }
};

export const getNotePriorityColor = (themeValue: string, colors: any, priority: number) => {
  return priority === 0
    ? themeValue === 'light'
      ? colors.none
      : '#7D7C7C'
    : priority === 1
    ? colors.normal
    : priority === 2
    ? colors.medium
    : colors.urgent;
};
