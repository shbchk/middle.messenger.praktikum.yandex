function omit<T extends object>(obj: T, fields: (keyof T)[]): Partial<T> {
  const newObj: Partial<T> = {};

  Object.keys(obj).forEach((key) => {
    if (fields.includes(key as keyof T)) {
      return;
    }

    newObj[key as keyof T] = obj[key as keyof T];
  });

  return newObj;
}

export default omit;
