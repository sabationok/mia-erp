function countPercentage(
  amount: number | undefined = 0,
  total: number | undefined = 0,
  fractionDigits: number | undefined = 2
) {
  return ((amount / total) * 100).toFixed(fractionDigits);
}

// function numberWithSpaces(n: number) {
//   return n
//     .toFixed(2)
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
// }

export { countPercentage };
