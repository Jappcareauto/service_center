import { LoadingState } from "@/shared/enums/LoadingState";
import { Pagination } from "@/shared/model/Pagination";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { findAllServiceAsync } from "../usecase/findAllServiceCenter/findAllServiceCenterAsync";
import { Service } from "../model/Service";

interface InitialState {
  allServiceCenterState: {
    loading: LoadingState;
    servicesCenter?: Service[];
    pagination?: Pagination;
  };
  collections: {
    ids: [];
    entities: Record<string, Service>;
  };
}

const initialState: InitialState = {
  allServiceCenterState: {
    loading: LoadingState.idle,
  },
  collections: {
    entities: {},
    ids: [],
  },
};

const sortComparer = (a: Service, b: Service) => {
  return a.title.localeCompare(b.title);
};
export const serviceApdapter = createEntityAdapter<Service>({
  sortComparer,
});

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
      serviceApdapter.setAll(state.collections, payload.data);
    });
  },
});
