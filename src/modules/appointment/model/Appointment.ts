import { AppointmentFilter } from "@/modules/Invoice.ts/model/AppointmentFilter";
import { Service } from "@/modules/service/model/Service";
import { User } from "@/modules/user/models/User";
import { Vehicle } from "@/modules/vehicle/model/vehicle";
import { Audit } from "@/shared/model/Audit";

export interface Appointment extends Audit {
  date: Date;
  locationType: "HOME" | "OFFICE" | "OTHER";
  note: string | null;
  serviceId: string;
  service?: Service;
  status:AppointmentFilter;
  vehicleId: string;
  vehicle?: Vehicle;
  user?: User;
}
