import { RootState } from "@/app/store";

export const appointmentFilter = (state: RootState) =>
  state.filter.appointment.statusFilter;
export const invoiceFilter = (state: RootState) =>
  state.filter.invoice.statusFilter;

export const filterSelector = {
  appointmentFilter,
  invoiceFilter,
};
