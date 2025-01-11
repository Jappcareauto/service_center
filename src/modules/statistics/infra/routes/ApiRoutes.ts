import { appointmentStatsCommand } from "../../usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentStatsCommand";

export const statsApiRoute = {
  findAllAppointmentStats: (command: appointmentStatsCommand) =>
    `/appointment/stats?startDate=${command.startDate}&endDate=${command.endDate}&range=${command.range}`,
};
