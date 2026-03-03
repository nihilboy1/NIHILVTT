export const getFirstName = (name: string): string => {
  if (!name) {
    return '';
  }
  const splitedName = name.split(' ');
  return splitedName[0];
};

export const formatUserTag = (name: string, id: number): string => {
  const safeName = (name || '').trim();
  if (!safeName) {
    return `#${id}`;
  }
  return `${safeName}#${id}`;
};
