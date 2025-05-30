import { Appointment } from "@/types";

export interface AppointmentDetailModalProps extends Appointment {
  isLoading?: boolean;
  isComplete?: boolean;
  onClick?: () => void;
}
