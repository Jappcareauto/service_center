import { AppStartListening } from "@/app/listenerMiddleware";
import { findAllAppointmentAsync } from "../../useCase/findAll/findAllAppointmentAsync";


export const appointmentMiddleware = (listener: AppStartListening) => {
  listener({
    actionCreator: findAllAppointmentAsync.pending,
    effect: async () => {
    
    },
  });
};
