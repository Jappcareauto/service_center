import { Appointment } from "../model/Appointment";
import { FindAllResponse } from "../useCase/findAll/findAllAppointmentResponse";
import { UpdateAppointmentStatusComand } from "../useCase/update/status/updateAppointmentStatusCommand";

export interface AppointementGetway {
  findAll: () => Promise<FindAllResponse>;
  updateStatus: (command: UpdateAppointmentStatusComand) => Promise<Appointment>;
}
