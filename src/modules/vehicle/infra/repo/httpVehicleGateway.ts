import { FindOneVehicleResponse } from "./../../useCase/findOneVehicle/findOneVehicleResponse";
import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { VehicleGateWay } from "../../gateway/VehicleGateway";
import { VehicleApiRoute } from "../Router/ApiRoutes";
import { findAllVehicleResponse } from "../../useCase/findAllVehicle/findOneVehicleResponse";

export class httpVehicleGateway extends HttpProvider implements VehicleGateWay {
  async FindOneVehicle(id: string): Promise<FindOneVehicleResponse> {
    const response = await this.getWithResult({
      url: VehicleApiRoute.findOne(id),
    });

    return response;
  }

  async FindAllVehicle(): Promise<findAllVehicleResponse> {
    const response = await this.getWithResult({
      url: VehicleApiRoute.findAll(),
    });
    return response;
  }
}
