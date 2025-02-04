import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { AppointementGetway } from "../../gateway/AppointmentGateway";
import { FindAllResponse } from "../../useCase/findAll/findAllAppointmentResponse";
import { AppointmentApiRoutes } from "../routes/ApiRoutes";
import { UpdateAppointmentStatusComand } from "../../useCase/update/status/updateAppointmentStatusCommand";
import { Appointment } from "../../model/Appointment";

export class HttpAppointenmentGetAway
  extends HttpProvider
  implements AppointementGetway
{
  async findAll(): Promise<FindAllResponse> {
    const response = await this.getWithResult({
      url: AppointmentApiRoutes.getAll(),
    });

    return response;
  }
  async updateStatus(
    command: UpdateAppointmentStatusComand
  ): Promise<Appointment> {
    const response = await this.putWithResult({
      command: command.status,
      url: AppointmentApiRoutes.updateStatus(command.id),
    });
    return response;
  }
}
