import { Audit } from "@/shared/model/Audit";
import { EmergencyStatus } from "./EmergencyStatus";

export interface EmergencyModel extends Audit {
  id: string;
  dateBefore: Date;
  title: string;
  not: string;
  dateAfter: Date;
  status: EmergencyStatus;
  serviceCenterId: string;
  vehicleId: string;
  garageId: string;
}

/*






*/
