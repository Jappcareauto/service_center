import { LoadingState } from "@/shared/enums/LoadingState";
import { createSlice } from "@reduxjs/toolkit";
import { LoginAsync } from "../usecases/login/LoginAsync";

type AuthState = {
  loading: LoadingState;
}

const initialState: AuthState = {
  loading: LoadingState.idle,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoginAsync.pending, (state) => {
      state.loading = LoadingState.pending;
    }).addCase(LoginAsync.rejected, (state) => {
      state.loading = LoadingState.failed;
    }).addCase(LoginAsync.fulfilled, (state, { payload }) => {
      state.loading = LoadingState.success;
    })
  }
});