export const updateIdsArray = ({
  id,
  arr,
  remove,
  toggle,
}: {
  id: string;
  arr?: string[] | ProxyConstructor;
  remove?: boolean;
  toggle?: boolean;
}): string[] => {
  // if (!Array.isArray(arr)) {
  //   console.log('IS NOT AN ARRAY');
  //   console.log(arr, { id });
  // }

  if (toggle) {
    if (Array.isArray(arr)) {
      // console.warn('toggle | isArray');
      return !arr.includes(id) ? [id, ...arr] : arr.filter(el => el !== id);
    }
    // console.warn('toggle | not isArray');
    return [id];
  } else if (remove) {
    if (Array.isArray(arr)) {
      // console.warn('remove | isArray');
      return arr.filter(el => el !== id);
    }
    // console.warn('remove | not isArray');
    return [];
  }
  if (Array.isArray(arr)) {
    // console.warn('isArray ADD TO ARRAY', !arr.includes(id));

    return !arr.includes(id) ? [id, ...arr] : arr;
  }
  return (arr || []) as string[];
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
