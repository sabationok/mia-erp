function getValueByPath<RD = any, Data = any>({
  data,
  path,
  separator = '.',
  returnDataType = 'string',
}: {
  data?: object | Data;
  path?: string;
  separator?: '.' | '/' | '_' | '-' | '*' | '+';
  returnDataType?: 'string' | 'number' | 'object';
}): RD | null {
  if (!data || !path) {
    return null;
  }
  const keys = path.split(separator);
  const [key, ...rest] = keys;

  if (rest.length === 0) {
    const value: RD = data[key as keyof typeof data];
    if ([returnDataType, 'string', 'number'].includes(typeof value)) return value;

    if (Array.isArray(value)) {
      const notValidArr = value.some(el => ![returnDataType, 'string', 'number'].includes(typeof el));
      if (notValidArr) return null;
      return value;
    }
  }

  return getValueByPath<RD>({
    data: data[key as keyof typeof data],
    path: rest.join(separator),
    separator,
    returnDataType,
  });
}

export default getValueByPath;
