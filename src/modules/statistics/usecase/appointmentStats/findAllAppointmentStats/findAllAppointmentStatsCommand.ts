import { StatsRange } from "@/modules/statistics/models/statsRanche";

export interface appointmentStatsCommand {
  startDate: string;
  endDate: string;
  range: StatsRange;
}
