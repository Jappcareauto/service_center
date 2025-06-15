import { Appointment, Invoice, InvoiceData } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  appointment: Appointment | null;
  invoice: Invoice | InvoiceData | null;
  appointmentId: string
}

const initialState: AuthState = {
  appointment: null,
  invoice: null,
  appointmentId: ""
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointment: (state, { payload }) => {
      state.appointment = payload;
    },
    setAppointmentId: (state, { payload }) => {
      state.appointmentId = payload;
    },
    setInvoice: (state, { payload }) => {
      state.invoice = payload;
    },
  },
});

export const { setAppointment, setInvoice, setAppointmentId } = appointmentSlice.actions;
export default appointmentSlice.reducer;
