// /**
//  * Розширений парсер query-рядка з підтримкою вкладених структур
//  * @param {string} queryString - Рядок параметрів
//  * @return {object} Об'єкт з параметрами
//  */
// function deepParseQueryParams(queryString: string) {
//   const params = new URLSearchParams(queryString);
//   const result = {};
//
//   for (const [key, value] of params.entries()) {
//     // Підтримка вкладених об'єктів (user[name]=John)
//     const keys = key.split(/[\[\]]/).filter(k => k);
//     let current = result;
//
//     for (let i = 0; i < keys.length; i++) {
//       const k = keys[i];
//
//       if (i === keys.length - 1) {
//         const currentVale = current[k];
//         // Обробка масивів
//         if (k in current) {
//           if (Array.isArray(current[k])) {
//             current[k].push(value);
//           } else {
//             current[k] = [current[k], value];
//           }
//         } else {
//           current[k] = value;
//         }
//       } else {
//         current[k] = current[k] || {};
//         current = current[k];
//       }
//     }
//   }
//
//   return result;
// }
