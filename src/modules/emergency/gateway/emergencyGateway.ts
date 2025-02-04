import { EmergencyModel } from "../ui/models/EmergencyModel";
import { EmergencyStatus } from "../ui/models/EmergencyStatus";
import { FindAllEmergencyResponse } from "../useCase/findAll/findAllEmergencyResponse";

export interface EmergencyGateway {
  findAllEmergency: () => Promise<FindAllEmergencyResponse>;
  updateStatus: (id: string,status:EmergencyStatus) => Promise<EmergencyModel>;
}
