import { StatsRange } from "@/enums/StatsRange";

export interface appointmentStatsCommand {
  startDate: string;
  endDate: string;
  range: StatsRange;
}
