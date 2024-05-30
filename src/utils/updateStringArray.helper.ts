export const updateIdsArray = <IdType extends string | number | symbol>({
  id,
  arr,
  remove,
  toggle,
  onRemove,
  onUpdate,
  upend,
}: {
  id: IdType;
  arr?: IdType[];
  remove?: boolean;
  toggle?: boolean;
  onUpdate?: (id: IdType) => void;
  onRemove?: (id: IdType) => void;
  upend?: boolean;
}): IdType[] => {
  const _update = (arr: IdType[]) => {
    const newArr = upend ? [...arr, id] : [id, ...arr];
    if (newArr.length > arr.length) {
      const _onUpdate = async (id: IdType) => onUpdate && onUpdate(id);
      _onUpdate(id).catch();
    }
    return newArr;
  };
  const _remove = (arr: IdType[]) => {
    const newArr = arr.filter(el => el !== id) as IdType[];
    if (newArr.length < arr.length) {
      const _onRemove = async (id: IdType) => onRemove && onRemove(id);
      _onRemove(id).catch();
    }
    return newArr;
  };

  if (toggle) {
    if (Array.isArray(arr)) {
      return arr.includes(id) ? _remove(arr) : _update(arr);
    }
    return [id];
  } else if (remove) {
    return Array.isArray(arr) ? _remove(arr) : [];
  }
  if (Array.isArray(arr)) {
    return _update(arr);
  }
  return [id] as IdType[];
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
