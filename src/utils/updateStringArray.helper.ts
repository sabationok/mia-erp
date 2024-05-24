export const updateIdsArray = ({
  id,
  arr,
  remove,
  toggle,
}: {
  id: string;
  arr?: string[];
  remove?: boolean;
  toggle?: boolean;
}): string[] => {
  if (toggle) {
    if (arr) {
      return !arr.includes(id) ? [id, ...arr] : arr.filter(el => el !== id);
    }
    return [id];
  } else if (remove) {
    if (Array.isArray(arr)) {
      return arr.filter(el => el !== id);
    }
    return [];
  }
  if (arr) {
    return !arr.includes(id) ? [id, ...arr] : arr;
  }
  return [id] as string[];
};

export const updateArray = <Data = any>({
  item,
  arr,
  remove,
  toggle,
  keyExtractor,
}: {
  item: Data;
  arr?: Data[];
  remove?: boolean;
  toggle?: boolean;
  keyExtractor: (data: Data) => string;
}): Data[] => {
  function checkArray(arr: Data[]) {
    return arr.find(el => keyExtractor(el) === keyExtractor(item));
  }
  function excludeFrom(arr: Data[]) {
    return arr.filter(el => keyExtractor(el) === keyExtractor(item));
  }

  if (toggle) {
    if (arr) {
      return !checkArray(arr) ? [item, ...arr] : excludeFrom(arr);
    }
    return [item];
  } else if (remove) {
    if (arr) {
      return excludeFrom(arr);
    }
    return [];
  }
  if (arr && !checkArray(arr)) {
    return [item, ...arr];
  }
  return arr ?? [];
};
