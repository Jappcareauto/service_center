import { LoadingState } from "@/shared/enums/LoadingState";
import { Pagination } from "@/shared/model/Pagination";
import { User } from "../models/User";
import { createSlice } from "@reduxjs/toolkit";
import { FindAllUserAsync } from "../usecase/findAllUser/findAllUserAsync";

interface InitialState {
  allUserState: {
    loading: LoadingState;
    users?: User[];
    pagination?: Pagination;
  };
}

const initialState: InitialState = {
  allUserState: {
    loading: LoadingState.idle,
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(FindAllUserAsync.pending, (state) => {
      state.allUserState.loading = LoadingState.pending;
    });
    buider.addCase(FindAllUserAsync.rejected, (state) => {
      state.allUserState.loading = LoadingState.failed;
    });
    buider.addCase(FindAllUserAsync.fulfilled, (state, action) => {
      state.allUserState.loading = LoadingState.success;
      state.allUserState.users = action.payload.data;
      state.allUserState.pagination = action.payload.pagination;
    });
  },
});
