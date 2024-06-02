export function toSerializableObj(obj: Record<string, any>) {
  // Створюємо новий об'єкт, щоб уникнути мутації оригінального об'єкта
  const result: Record<string, any> = {};

  // Проходимо через всі властивості об'єкта
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // Якщо значення є функцією, ми його пропускаємо
      if (typeof value === 'function') {
        continue;
      }

      // Якщо значення є об'єктом, викликаємо функцію рекурсивно
      if (typeof value === 'object' && value !== null) {
        result[key] = Array.isArray(value)
          ? value.map(item => {
              return toSerializableObj(item);
            })
          : toSerializableObj(value);
      } else {
        // Інакше просто копіюємо значення
        result[key] = value;
      }
    }
  }

  return result;
}
