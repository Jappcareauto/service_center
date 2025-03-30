import dayjs from "dayjs";
export function formatDateToMedium(date?: Date | string): string {
  const result = dayjs(date).format("MMM, DD, YYYY hA");
  return result;
}

export function formatDateToShortString(date: Date | string): string {
  const result = dayjs(date).format("YYYY-MM-DD");
  return result;
}
