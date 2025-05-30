import { Appointment, Invoice } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  appointment: Appointment | null;
  invoiceApp: Invoice | null
}

const initialState: AuthState = {
  appointment: null,
  invoiceApp: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointment: (state, { payload }) => {
      state.appointment = payload;
    },
    setInvoiceApp: (state, { payload }) => {
      state.invoiceApp = payload;
    },
  },
});

export const { setAppointment, setInvoiceApp } = appointmentSlice.actions;
export default appointmentSlice.reducer;
