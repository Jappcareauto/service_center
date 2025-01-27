import { LoadingState } from "@/shared/enums/LoadingState";
import { Pagination } from "@/shared/model/Pagination";
import { User } from "../models/User";
import { createSlice } from "@reduxjs/toolkit";
import { FindAllUserAsync } from "../usecase/findAllUser/findAllUserAsync";
import { findSelfAsync } from "../usecase/findSelf/findSelfAsync";

interface InitialState {
  allUserState: {
    loading: LoadingState;
    users?: User[];
    pagination?: Pagination;
  };
  mySelfState: { loading: LoadingState; mySelf?: User };
}

const initialState: InitialState = {
  allUserState: {
    loading: LoadingState.idle,
  },
  mySelfState: { loading: LoadingState.idle },
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

    //
    buider.addCase(findSelfAsync.pending, (state) => {
      state.mySelfState.loading = LoadingState.pending;
    });
    buider.addCase(findSelfAsync.rejected, (state) => {
      state.mySelfState.loading = LoadingState.failed;
    });
    buider.addCase(findSelfAsync.fulfilled, (state, action) => {
      state.mySelfState.mySelf = action.payload;
      state.mySelfState.loading = LoadingState.success;
    });
  },
});
