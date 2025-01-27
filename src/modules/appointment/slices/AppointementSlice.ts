import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "@/shared/enums/LoadingState";
import { Appointment } from "../model/Appointment";
import { Pagination } from "@/shared/model/Pagination";
import { findAllAppointmentAsync } from "../useCase/findAll/findAllAppointmentAsync";

interface AppointmentState {
  loading: LoadingState;
  loadingErrorMessage:string,
  appointments?: Appointment[];
  pagination?: Pagination;
  activeAppointment?: Appointment;
}

const initialState: AppointmentState = {
  loading: LoadingState.idle,
  loadingErrorMessage:""
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
      console.log('appointments', action.payload.appointments)
    },
    setLoadingStatut: (state, action: PayloadAction<{ loading: LoadingState }>) => {
      state.loading = action.payload.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAllAppointmentAsync.pending, (state) => {
      state.loading = LoadingState.pending;
    });
    builder.addCase(findAllAppointmentAsync.rejected, (state) => {
      state.loading = LoadingState.failed;
    });
    builder.addCase(findAllAppointmentAsync.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      // state.appointments = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = LoadingState.success;
    });
  },
});

export const appointmentSliceAction = AppointmentSlice.actions;
