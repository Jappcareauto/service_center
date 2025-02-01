import { formatDateToShortString } from "@/shared/utils/dateFormat";
import { StatsRange } from "../models/statsRanche";
import { appointmentStatsCommand } from "../usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentStatsCommand";



export function calculateRange(range: StatsRange): appointmentStatsCommand {
  const now = new Date();
  let startDate: Date;
  const endDate: Date = now;
  switch (range) {
    case StatsRange.WEEK:
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );
      break;
    case StatsRange.MONTH:
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      break;
    case StatsRange.YEAR:
      startDate = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      );
      break;
    default:
      throw new Error("Invalid range");
  }
  return {
    startDate: formatDateToShortString(startDate),
    endDate: formatDateToShortString(endDate),
    range,
  };
}
