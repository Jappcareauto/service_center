import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { EmergencyGateway } from "../../gateway/emergencyGateway";
import { FindAllEmergencyResponse } from "../../useCase/findAll/findAllEmergencyResponse";
import { emergencyApiRoutes } from "../router/Router";
import { EmergencyModel } from "../../ui/models/EmergencyModel";
import { EmergencyStatus } from "../../ui/models/EmergencyStatus";

export class HttpEmergencygateway
  extends HttpProvider
  implements EmergencyGateway
{
  async findAllEmergency(): Promise<FindAllEmergencyResponse> {
    const response = await this.getWithResult({
      url: emergencyApiRoutes.findAll(),
    });
    return response;
  }

  async updateStatus(
    id: string,
    status: EmergencyStatus
  ): Promise<EmergencyModel> {
    const response = await this.patchWithResult({
      url: emergencyApiRoutes.updateStatus(id, status),
    });
    return response;
  }
}
