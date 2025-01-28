import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { LoadingState } from "@/shared/enums/LoadingState";
import { Appointment } from "../model/Appointment";
import { Pagination } from "@/shared/model/Pagination";
import { findAllAppointmentAsync } from "../useCase/findAll/findAllAppointmentAsync";

interface AppointmentState {
  loading: LoadingState;
  appointments?: Appointment[];
  pagination?: Pagination;
  activeAppointment?: Appointment;
  collections: {
    ids: string[];
    entities: Record<string, Appointment>;
  };
}

const initialState: AppointmentState = {
  loading: LoadingState.idle,
  collections: {
    ids: [],
    entities: {},
  },
};

const sortComparer = (a: Appointment, b: Appointment) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export const appointmentAdapter = createEntityAdapter<Appointment>({
  sortComparer,
});

export const AppointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    updateOne: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Appointment> }>
    ) => {
      appointmentAdapter.updateOne(state.collections, action.payload);
    },

    setActiveAppointmentById: (
      state,
      action: PayloadAction<{ appointment: Appointment }>
    ) => {
      const { appointment } = action.payload;
      state.activeAppointment = appointment;
    },
    updateAppointments: (
      state,
      action: PayloadAction<{ appointments: Appointment[] }>
    ) => {
      state.appointments = action.payload.appointments;
      console.log("appointments", action.payload.appointments);
    },
    setLoadingStatut: (
      state,
      action: PayloadAction<{ loading: LoadingState }>
    ) => {
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
      appointmentAdapter.setAll(state.collections, action.payload.data);
    });
  },
});

export const appointmentSliceAction = AppointmentSlice.actions;
