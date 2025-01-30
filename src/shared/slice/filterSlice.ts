import { InvoiceStatus } from "@/modules/Invoice.ts/model/InvoiceStatus";
import { AppointmentFilter } from "../../modules/Invoice.ts/model/AppointmentFilter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const appointmentFilter: AppointmentFilter[] = [
  AppointmentFilter.NOTSTARTED,
  AppointmentFilter.INPROPGRESS,
  AppointmentFilter.COMPLETED,
];

interface InitialState {
  appointment: {
    statusFilter: AppointmentFilter;
  };
  invoice: { statusFilter: InvoiceStatus };
}

const initialState: InitialState = {
  appointment: {
    statusFilter: AppointmentFilter.COMPLETED,
  },
  invoice: {
    statusFilter: InvoiceStatus.Paid,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    onFilterAppointments: (
      state,
      action: PayloadAction<{ filter: AppointmentFilter }>
    ) => {
      state.appointment.statusFilter = action.payload.filter;
      console.log('filter', action.payload)
    },
    onFilterInvoices: (
      state,
      action: PayloadAction<{ filter: InvoiceStatus }>
    ) => {
      state.invoice.statusFilter = action.payload.filter;
    },
  },
});
export const filterAction = filterSlice.actions