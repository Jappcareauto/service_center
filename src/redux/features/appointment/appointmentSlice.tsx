import { Appointment, Invoice } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  appointment: Appointment | null;
  invoiceApp: Invoice | null;
  appointmentId: string
}

const initialState: AuthState = {
  appointment: null,
  invoiceApp: null,
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
    setInvoiceApp: (state, { payload }) => {
      state.invoiceApp = payload;
    },
  },
});

export const { setAppointment, setInvoiceApp, setAppointmentId } = appointmentSlice.actions;
export default appointmentSlice.reducer;
