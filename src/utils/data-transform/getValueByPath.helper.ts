export function getValueByPath({ data, path }: { data?: object; path?: string }): any {
  if (!data || !path) {
    return null;
  }
  const keys = path.split('.');
  const [key, ...rest] = keys;

  if (rest.length === 0) {
    return data[key as keyof typeof data];
  }

  return getValueByPath({
    data: data[key as keyof typeof data],
    path: rest.join('.'),
  });
}
