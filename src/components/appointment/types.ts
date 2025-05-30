import { Appointment } from "@/types";

export interface AppointmentType extends Appointment {
  onDetail?: () => void;
  className?: string
}
