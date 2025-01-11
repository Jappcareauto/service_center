
import dayjs from 'dayjs';


export function formatDateToMedium(date: string): string {
  return dayjs(date).format('MMM, DD, YYYY hA');
}

export function formatDateToShortString(date: Date): string {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}