import { FindAllResponse } from "../useCase/findAll/findAllAppointmentResponse";

export interface AppointementGetway {
  findAll: () => Promise<FindAllResponse>;
}
