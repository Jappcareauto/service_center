import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { StatsGateway } from "../../gateway/statsGateway";
import { FindAllAppointmentStatsResponse } from "../../usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentResponse";
import { statsApiRoute } from "../routes/ApiRoutes";
import { appointmentStatsCommand } from "../../usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentStatsCommand";

export class HttpStatsGateWay extends HttpProvider implements StatsGateway {
  async findAllAppointmentStats(
    command: appointmentStatsCommand
  ): Promise<FindAllAppointmentStatsResponse> {
    const response = await this.getWithResult({
      url: statsApiRoute.findAllAppointmentStats(command),
    });

    return response;
  }
}
