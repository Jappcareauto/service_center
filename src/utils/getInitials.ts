import { AppointmentStatus } from '@/enums';
import { format, parseISO } from "date-fns";

export function getInitials(name: string) {
  if(!name) return "";
  const parts = name?.split(" ");
  let initials: string = "";
  for (let i = 0; i < parts?.length; i++) {
    const initial = parts[i]?.charAt(0).toUpperCase();
    initials += initial;
  }
  return initials?.substring(0, 4);
}

export const formatDateTime = (dateString: string): string => {
  if(!dateString) return "";
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "MMM, d, yyyy ha"); // e.g., Apr, 2, 2025 9am
};

export const formatStatusText = (status: AppointmentStatus): string => {
  const result = status.replace("_", " ");
  return result;
};
