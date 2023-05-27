function getValueByPath<T = any, Data = any>({ data, path }: { data?: object | Data; path?: string }): T | null {
  if (!data || !path) {
    return null;
  }
  const keys = path.split('.');
  const [key, ...rest] = keys;

  if (rest.length === 0) {
    // if (typeof data[key as keyof typeof data] === 'string') return data[key as keyof typeof data];
    // if (typeof data[key as keyof typeof data] === 'number') return data[key as keyof typeof data];

    if (['string', 'number'].includes(typeof data[key as keyof typeof data])) return data[key as keyof typeof data];
  }

  return getValueByPath<T>({
    data: data[key as keyof typeof data],
    path: rest.join('.'),
  });
}

export default getValueByPath;
