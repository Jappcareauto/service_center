import { FindAllAppointmentStatsResponse } from "../usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentResponse";
import { appointmentStatsCommand } from "../usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentStatsCommand";

export interface StatsGateway {
  findAllAppointmentStats: (
    command: appointmentStatsCommand
  ) => Promise<FindAllAppointmentStatsResponse>;
}
