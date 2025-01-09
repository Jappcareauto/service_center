import { RootState } from "@/app/store";

const loading = (state: RootState) => state.appointment.loading;

const appointments = (state: RootState) => state.appointment.appointments;
const activeAppointment = (state: RootState) =>
  state.appointment.activeAppointment;
const pagination = (state: RootState) => state.appointment.pagination;

export const AppointementState = { loading, appointments, pagination,activeAppointment };
