// function getValueByPath(obj: object, path: string[]): object | string | null | undefined {
//
//   // Розділити шлях на масив ключів
//   const keys = Array.isArray(path) ? path : path.split('.');
//
//   // Якщо масив ключів порожній, повернути вихідний об'єкт
//   if (keys.length === 0) {
//     return obj;
//   }
//
//   // Отримати перший ключ
//   const key = keys[0];
//
//   // Отримати значення за ключем
//   const value = obj[key];
//
//   // Якщо значення не визначено, повернути undefined
//   if (value === undefined) {
//     return undefined;
//   }
//
//   // Якщо це останній ключ, повернути значення
//   if (keys.length === 1) {
//     return value;
//   }
//
//   // Рекурсивно викликати функцію для наступного ключа
//   return getValueByPath(value, keys.slice(1));
// }
// function getValueByPath(obj: object, path: string) {
//   const keys = path.split('.');
//   let value = obj;
//
//   for (let i = 0; i < keys.length; i++) {
//     const key = keys[i];
//     value = obj[key as keyof typeof obj];
//
//     if (value === undefined) {
//       return undefined;
//     }
//   }
//
//   return value;
// }
function getValueByPath({ data, path }: { data?: object, path?: string }): any {
  if (!data || !path) {
    return null;
  }
  const keys = path.split('.');
  const [key, ...rest] = keys;

  if (rest.length === 0) {
    return data[key as keyof typeof data];
  }

  return getValueByPath({ data: data[key as keyof typeof data], path: rest.join('.') });
}

export default getValueByPath;
