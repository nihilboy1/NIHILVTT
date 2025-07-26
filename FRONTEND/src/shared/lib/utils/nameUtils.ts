export const getFirstName = (name: string): string => {
  if (!name) {
    return '';
  }
  const splitedName = name.split(' ');
  return splitedName[0];
};
