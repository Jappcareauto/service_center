
import dayjs from 'dayjs';


export function formatDate(date: string): string {
  return dayjs(date).format('MMM, DD, YYYY hA');
}

