import { AppStartListening } from "@/app/listenerMiddleware";
import { updateAppointmentStatusAsync } from "../../useCase/update/status/updateAppointmentStatusAsync";
import { appointmentSliceAction } from "../../slices/AppointementSlice";

export const updateAppointmentStatusMiddleware = (
  listener: AppStartListening
) => {
  listener({
    actionCreator: updateAppointmentStatusAsync.fulfilled,
    effect: (action, listenerApi) => {
      const updaptedAppointement = action.payload;
      console.log("appointment", updaptedAppointement);
      listenerApi.dispatch(
        appointmentSliceAction.updateOne({
          id: updaptedAppointement.id,
          changes: updaptedAppointement,
        })
      );
      listenerApi.dispatch(
        appointmentSliceAction.setActiveAppointmentById({
          appointment: updaptedAppointement,
        })
      );
    },
  });
};
