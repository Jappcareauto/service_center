import { Vehicle } from "@/modules/vehicle/model/vehicle";
import { Audit } from "@/shared/model/Audit";

export interface Appointment extends Audit {
  date: string;
  locationType: "HOME" | "OFFICE" | "OTHER";
  note: string | null;
  serviceId: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  vehicleId: string;
  vehicle?: Vehicle;
}
