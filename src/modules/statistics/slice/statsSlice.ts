import { findAllAppointmentStatsAsync } from "./../usecase/appointmentStats/findAllAppointmentStats/findAllAppointmentStatsAsync";
import { LoadingState } from "@/shared/enums/LoadingState";
import { AppointmentStats } from "../models/appointmentStats";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  appointmentsStatsState: {
    loading: LoadingState;
    stats?: AppointmentStats[];
  };
}

const initialState: InitialState = {
  appointmentsStatsState: {
    loading: LoadingState.idle,
  },
};

export const StatsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findAllAppointmentStatsAsync.pending, (state) => {
      state.appointmentsStatsState.loading = LoadingState.pending;
    });

    builder.addCase(findAllAppointmentStatsAsync.rejected, (state) => {
      state.appointmentsStatsState.loading = LoadingState.failed;
    });

    builder.addCase(
      findAllAppointmentStatsAsync.fulfilled,
      (state, { payload }) => {
        state.appointmentsStatsState.stats = payload.data;
        state.appointmentsStatsState.loading = LoadingState.success;
        console.log("stats", state.appointmentsStatsState.stats);
      }
    );
  },
});
