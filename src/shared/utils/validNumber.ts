export const validPositiveNumber = (number: number): number|string => {
  const isNumberOk = !isNaN(number) || number < 0;

  if (!isNumberOk) {
    return "";
  }
  return number;
};
