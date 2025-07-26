function isObject(item: unknown): item is object {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}

export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const output = { ...target } as T;

  if (isObject(target) && isObject(source)) {
    (Object.keys(source) as Array<keyof T>).forEach((key) => {
      if (isObject(source[key]) && target[key] && isObject(target[key])) {
        output[key] = deepMerge(target[key] as object, source[key] as object) as T[keyof T];
      } else {
        output[key] = source[key] as T[keyof T];
      }
    });
  }

  return output;
}
