import { AppStartListening } from "@/app/listenerMiddleware";
import { FindAllVehicleAsync } from "@/modules/vehicle/useCase/findAllVehicle/findAllVehicleAsync";
import { appointmentSliceAction } from "../../slices/AppointementSlice";
import { findAllAppointmentAsync } from "../../useCase/findAll/findAllAppointmentAsync";
import { LoadingState } from "@/shared/enums/LoadingState";
import { findAllServiceAsync } from "@/modules/service/usecase/findAllServiceCenter/findAllServiceCenterAsync";

export const appointmentMiddleware = (listener: AppStartListening) => {
  listener({
    actionCreator: findAllAppointmentAsync.fulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.dispatch(
        appointmentSliceAction.setLoadingStatut({
          loading: LoadingState.pending,
        })
      );

      // -------------------------services
      const servicesResponse = await listenerApi
        .dispatch(findAllServiceAsync())
        .unwrap();
      const services = servicesResponse.data;
      // -----------------------vehicle
      const vehicleData = await listenerApi
        .dispatch(FindAllVehicleAsync())
        .unwrap();

      const appointmentData = action.payload;
      const updatedAppointments = appointmentData.data.map((appointment) => {
        const vehicle = vehicleData.data.find(
          (vehicle) => vehicle.id === appointment.vehicleId
        );
        const service = services?.find((s) => s.id === appointment.serviceId);
        return {
          ...appointment,
          vehicle,
          service,
        };
      });
      listenerApi.dispatch(
        appointmentSliceAction.updateAppointments({
          appointments: updatedAppointments,
        })
      );
      listenerApi.dispatch(
        appointmentSliceAction.setLoadingStatut({
          loading: LoadingState.success,
        })
      );
      listenerApi.dispatch(findAllServiceAsync());
    },
  });
};
