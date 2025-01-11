import { findAllVehicleResponse } from "../useCase/findAllVehicle/findOneVehicleResponse";
import { FindOneVehicleResponse } from "../useCase/findOneVehicle/findOneVehicleResponse";

export interface VehicleGateWay {
  FindOneVehicle: (id: string) => Promise<FindOneVehicleResponse>;
  FindAllVehicle: () => Promise<findAllVehicleResponse>
}
