import { Appointment } from "@/types";

export interface AppointmentType extends Appointment {
  onDetail?: () => void;
  onClick?: () => void;
  className?: string;
  active?: boolean
}
