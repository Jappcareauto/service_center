import { AppointmentFilter } from "@/modules/Invoice.ts/model/AppointmentFilter";

export interface UpdateAppointmentStatusComand {
  id: string;
  status: { status: AppointmentFilter };
}
