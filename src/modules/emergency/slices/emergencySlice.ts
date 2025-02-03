import { LoadingState } from "@/shared/enums/LoadingState";
import { Collection } from "@/shared/model/Collection";
import { EmergencyModel } from "../ui/models/EmergencyModel";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { findAllEmergencyAsync } from "../useCase/findAll/findAllEmegencyAsync";

export interface InitialState {
  loading: LoadingState;
  collection: Collection<EmergencyModel>;
}

const initialState: InitialState = {
  loading: LoadingState.idle,
  collection: {
    entities: {},
    ids: [],
  },
};

const sortComparer = (a: EmergencyModel, b: EmergencyModel) =>
  new Date(a.dateAfter).getTime() - new Date(b.dateAfter).getTime();

export const emergencyAdapter = createEntityAdapter<EmergencyModel>({
  sortComparer,
});

export const emergencySlice = createSlice({
  name: "emergency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findAllEmergencyAsync.pending, (state) => {
      state.loading = LoadingState.pending;
    });
    builder.addCase(findAllEmergencyAsync.rejected, (state) => {
      state.loading = LoadingState.failed;
    });
    builder.addCase(findAllEmergencyAsync.fulfilled, (state, action) => {
      emergencyAdapter.setAll(state.collection, action.payload.data);
      state.loading = LoadingState.success;
    });
  },
});

export const emergencySliceAction = emergencySlice.actions;
