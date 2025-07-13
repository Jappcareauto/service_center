import { Appointment } from "@/types";

export interface AppointmentDetailModalProps extends Appointment {
  type?: 'accepting' | 'declining' | 'completing';
}
