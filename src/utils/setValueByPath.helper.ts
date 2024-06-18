// export function setValueByPath<Obj extends Record<string, any> = Record<string, any>>(
//   path: string,
//   value: any,
//   options?: { separator?: string }
// ) {
//   const pathArray = path.split(options?.separator || '.');
//
//   let currentObj: Record<string, any> = {};
//
//   for (let i = 0; i < pathArray.length; i++) {
//     const key = pathArray[i];
//
//     if (i === pathArray.length - 1) {
//       currentObj[key] = value;
//     } else {
//       if (!currentObj[key]) {
//         currentObj[key] = {};
//       }
//       currentObj = currentObj[key];
//     }
//   }
//   return currentObj as Obj;
// }

export function setValueByPath<Obj extends Record<string, any> = Record<string, any>, Path extends string = string>(
  path: Path,
  value: any,
  target?: Obj,
  options?: { separator?: string; mutation?: boolean }
): Obj {
  const separator = options?.separator || '.';
  const pathArray = path?.split(separator) ?? '';

  // Рекурсивна функція для установки значення
  const setValueRecursively = (currentObj: Record<string, any>, keys: string[]): void => {
    try {
      const key = keys[0];

      if (keys.length === 1) {
        currentObj[key] = value;
      } else {
        if (!currentObj[key]) {
          currentObj[key] = {};
        }
        setValueRecursively(currentObj[key], keys.slice(1));
      }
    } catch (e) {}
  };
  // Клонування об'єкта для запобігання мутації вхідного об'єкта
  const newObj = target ? (options?.mutation ? target : JSON.parse(JSON.stringify(target))) : {};

  if (!path) {
    return newObj as Obj;
  }

  setValueRecursively(newObj, pathArray);

  return newObj as Obj;
}
