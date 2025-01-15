import { LoadingState } from "@/shared/enums/LoadingState";
import { Pagination } from "@/shared/model/Pagination";
import { createSlice } from "@reduxjs/toolkit";
import { findAllServiceenterAsync } from "../usecase/findAllService/findAllServiceCenterAsync";
import { ServiceCenter } from "../model/ServiceCenter";

interface InitialState {
  allServiceCenterState: {
    loading: LoadingState;
    servicesCenter?: ServiceCenter[];
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
    builder.addCase(findAllServiceenterAsync.pending, (state) => {
      state.allServiceCenterState.loading = LoadingState.pending;
    });
    builder.addCase(findAllServiceenterAsync.rejected, (state) => {
      state.allServiceCenterState.loading = LoadingState.failed;
    });
    builder.addCase(findAllServiceenterAsync.fulfilled, (state, { payload }) => {
      state.allServiceCenterState.pagination = payload.pagination;
      state.allServiceCenterState.servicesCenter = payload.data;
      console.log("paylaod", payload);
      state.allServiceCenterState.loading = LoadingState.success;
    });
  },
});
