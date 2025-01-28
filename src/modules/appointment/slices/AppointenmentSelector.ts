import { RootState } from "@/app/store";
import { appointmentAdapter } from "./AppointementSlice";
import { createSelector } from "@reduxjs/toolkit";
import { vehicleSelector } from "@/modules/vehicle/slice/vehicleSelector";
import { serviceCenterSelector } from "@/modules/service/slice/selectors";
import { userSelector } from "@/modules/user/slice/selectors";

const loading = (state: RootState) => state.appointment.loading;

const appointments = (state: RootState) => state.appointment.appointments;
const activeAppointment = (state: RootState) =>
  state.appointment.activeAppointment;
const pagination = (state: RootState) => state.appointment.pagination;
const appointmentAdapterSelector = appointmentAdapter.getSelectors<RootState>(
  (state) => state.appointment.collections
);

const appointmentWithAll = createSelector(
  [
    appointmentAdapterSelector.selectAll,
    vehicleSelector.selectAll,
    serviceCenterSelector.selectAll,
    userSelector.selectAll,
  ],
  (appointmentsEntities, vehicleEntites, servicesEntities, usersEntities) =>
    appointmentsEntities.map((appointment) => {
      const vehicle = vehicleEntites.find(
        (vehicle) => vehicle.id === appointment?.vehicleId
      );
      const service = servicesEntities.find(
        (service) => service.id === appointment.serviceId
      );
      const user = usersEntities.find((user) => user.id === vehicle?.createdBy);
      return {
        ...appointment,
        vehicle,
        service,
        user,
      };
    })
);

export type AppointmentWithAll = ReturnType<typeof appointmentWithAll>;

export const AppointementSelector = {
  loading,
  appointments,
  pagination,
  activeAppointment,
  appointmentWithAll,
  ...appointmentAdapterSelector,
};
