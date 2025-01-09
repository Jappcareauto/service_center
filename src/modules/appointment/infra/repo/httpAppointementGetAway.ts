import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { AppointementGetway } from "../../gateway/AppointmentGateway";
import { FindAllResponse } from "../../useCase/findAll/findAllAppointmentResponse";
import { AppointmentApiRoutes } from "../routes/ApiRoutes";

export class httpAppointenmentGetAway
  extends HttpProvider
  implements AppointementGetway
{
  async findAll(): Promise<FindAllResponse> {
    const response = await this.getWithResult({
      url: AppointmentApiRoutes.getAll(),
    });
    console.log("response", response);

    return response;
  }
}
