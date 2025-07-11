function isObject(item: any): item is object {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const output = { ...target } as T;

  if (isObject(target) && isObject(source)) {
    (Object.keys(source) as Array<keyof T>).forEach(key => {
      if (isObject(source[key]) && (target[key] && isObject(target[key]))) {
        // If both are objects, deep merge
        output[key] = deepMerge(target[key] as object, source[key] as object) as T[keyof T];
      } else {
        // Otherwise, directly assign (overwriting arrays, primitives, etc.)
        output[key] = source[key] as T[keyof T];
      }
    });
  }

  return output;
}
