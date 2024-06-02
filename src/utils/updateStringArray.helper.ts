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
  const idsSet = new Set(Array.isArray(arr) ? arr : []);

  const _update = (): IdType[] => {
    const newArr = upend ? [...idsSet, id] : [id, ...idsSet];
    if (newArr.length > idsSet.size) {
      const _onUpdate = async (id: IdType) => onUpdate && onUpdate(id);
      _onUpdate(id).catch();
    }
    return newArr;
  };
  const _remove = () => {
    idsSet.delete(id);
    const newArr = [...idsSet] as IdType[];
    if (newArr.length < idsSet.size) {
      const _onRemove = async (id: IdType) => onRemove && onRemove(id);
      _onRemove(id).catch();
    }
    return newArr;
  };

  if (toggle) {
    return idsSet.has(id) ? _remove() : _update();
  } else if (remove) {
    return _remove();
  }
  return idsSet.has(id) ? [...idsSet] : _update();
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
