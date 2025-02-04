import { LoadingState } from "@/shared/enums/LoadingState";
import { Vehicle } from "../model/vehicle";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { findOneVehicleAsync } from "../useCase/findOneVehicle/findOneVehicleAsync";
import { FindAllVehicleAsync } from "../useCase/findAllVehicle/findAllVehicleAsync";
import { Pagination } from "@/shared/model/Pagination";

interface InitialState {
  activeVehicleState: { loading: LoadingState; activeVehicle?: Vehicle };
  allVehiclesState: {
    loading: LoadingState;
    vehicles?: Vehicle[];
    pagination?: Pagination;
  };
  collections: {
    ids: string[];
    entities: Record<string, Vehicle>;
  };
}

const initialState: InitialState = {
  activeVehicleState: { loading: LoadingState.idle },
  allVehiclesState: {
    loading: LoadingState.idle,
  },
  collections: {
    ids: [],
    entities: {},
  },
};

const sortComparer = (a: Vehicle, b: Vehicle) => {
  return a.name.localeCompare(b.name);
};
export const vehicleAdapter = createEntityAdapter({
  sortComparer,
});

export const VehicleSlice = createSlice({
  name: "vehicle",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(findOneVehicleAsync.pending, (state) => {
      state.activeVehicleState.loading = LoadingState.pending;
    });
    builder.addCase(findOneVehicleAsync.rejected, (state) => {
      state.activeVehicleState.loading = LoadingState.failed;
    });
    builder.addCase(findOneVehicleAsync.fulfilled, (state, action) => {
      const { payload } = action;

      state.activeVehicleState.activeVehicle = payload;
      state.activeVehicleState.loading = LoadingState.success;
    });
    //findAllVehicle Case
    builder.addCase(FindAllVehicleAsync.pending, (state) => {
      state.allVehiclesState.loading = LoadingState.pending;
    });
    builder.addCase(FindAllVehicleAsync.rejected, (state) => {
      state.allVehiclesState.loading = LoadingState.failed;
    });
    builder.addCase(FindAllVehicleAsync.fulfilled, (state, { payload }) => {
      const allVehiclesState = state.allVehiclesState;

      allVehiclesState.loading = LoadingState.success;
      allVehiclesState.pagination = payload.pagination;
      allVehiclesState.vehicles = payload.data;
      vehicleAdapter.setAll(state.collections, payload.data);
    });
  },
});
