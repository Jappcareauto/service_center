import { findAllVehicleResponse } from "../useCase/findAllVehicle/findOneVehicleResponse";
import { FindOneVehicleResponse } from "../useCase/findOneVehicle/findOneVehicleResponse";

export interface vehicleGateWay {
  FindOneVehicle: (id: string) => Promise<FindOneVehicleResponse>;
  FindAllVehicle: () => Promise<findAllVehicleResponse>;
}
