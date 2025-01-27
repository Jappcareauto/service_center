import { LoadingState } from "@/shared/enums/LoadingState";
import { Pagination } from "@/shared/model/Pagination";
import { createSlice } from "@reduxjs/toolkit";
import { findAllServiceAsync } from "../usecase/findAllServiceCenter/findAllServiceCenterAsync";
import { Service } from "../model/Service";

interface InitialState {
  allServiceCenterState: {
    loading: LoadingState;
    servicesCenter?: Service[];
    pagination?: Pagination;
  };
}

const initialState: InitialState = {
  allServiceCenterState: {
    loading: LoadingState.idle,
  },
};

export const ServicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findAllServiceAsync.pending, (state) => {
      state.allServiceCenterState.loading = LoadingState.pending;
    });
    builder.addCase(findAllServiceAsync.rejected, (state) => {
      state.allServiceCenterState.loading = LoadingState.failed;
    });
    builder.addCase(findAllServiceAsync.fulfilled, (state, { payload }) => {
      state.allServiceCenterState.pagination = payload.pagination;
      state.allServiceCenterState.servicesCenter = payload.data;
      state.allServiceCenterState.loading = LoadingState.success;
    });
  },
});
