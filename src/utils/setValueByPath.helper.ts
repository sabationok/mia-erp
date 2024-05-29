export function setValueByPath(path: string, value: any, options?: { separator?: string }) {
  const pathArray = path.split(options?.separator || '.');

  let currentObj: Record<string, any> = {};

  for (let i = 0; i < pathArray.length; i++) {
    const key = pathArray[i];
    if (i === pathArray.length - 1) {
      currentObj[key] = value;
    } else {
      if (!currentObj[key]) {
        currentObj[key] = {};
      }
      currentObj = currentObj[key];
    }
  }
}
