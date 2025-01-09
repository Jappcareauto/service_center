import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "@/shared/enums/LoadingState";
import { Appointment } from "../model/Appointment";
import { Pagination } from "@/shared/model/Pagination";
import { findAllAppointment } from "../useCase/findAll/findAllAppointmentAsync";

interface AppointmentState {
  loading: LoadingState;
  appointments?: Appointment[];
  pagination?: Pagination;
  activeAppointment?: Appointment;
}

const initialState: AppointmentState = {
  loading: LoadingState.idle,
};

export const AppointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setActiveAppointmentById: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const id = action.payload.id;
      state.activeAppointment = state.appointments?.find(
        (appointment) => appointment.id === id
      );
    },
    updateAppointments: (
      state,
      action: PayloadAction<{ appointments: Appointment[] }>
    ) => {
      state.appointments = action.payload.appointments;
      console.log("state.appointments", state.appointments);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAllAppointment.pending, (state) => {
      state.loading = LoadingState.pending;
    });
    builder.addCase(findAllAppointment.rejected, (state) => {
      state.loading = LoadingState.failed;
    });
    builder.addCase(findAllAppointment.fulfilled, (state, action) => {
      state.appointments = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = LoadingState.success;
    });
  },
});

export const appointmentSliceAction = AppointmentSlice.actions;
