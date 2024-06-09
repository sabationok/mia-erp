export function getValueByPath<Data extends Record<string, any>, Path extends string = string, Value = any>({
  data,
  path,
  separator,
}: {
  data?: Data;
  path?: Path;
  separator?: string;
}): Value | undefined {
  return _getValueByPath<Data, Path, Value>({ data, path, separator, isRoot: true });
}

function _getValueByPath<Data extends Record<string, any>, Path extends string = string, Value = any>({
  data,
  path,
  separator,
  currentPath,
}: {
  data?: Data;
  path?: Path;
  separator?: string;
  isRoot?: boolean;
  currentPath?: string;
}): Value | undefined {
  const keys = path?.split(separator ?? '.') ?? [];
  const [key, ...rest] = keys;

  try {
    if (rest.length === 0) {
      return data?.[key as keyof typeof data];
    }

    return _getValueByPath({
      data: data?.[key as keyof typeof data],
      path: rest.join('.'),
      separator,
      isRoot: false,
    });
  } catch (e) {
    console.error('[Get value by path error]'.toUpperCase(), e, {
      data,
      path,
      currentPath: `${currentPath}${separator}${key}`,
      separator,
    });
    return undefined;
  }
}
