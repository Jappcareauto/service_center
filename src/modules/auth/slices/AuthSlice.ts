import { LoadingState } from "@/shared/enums/LoadingState";
import { createSlice } from "@reduxjs/toolkit";
import { LoginAsync } from "../usecases/login/LoginAsync";
import { LoginResponse } from "../usecases/login/LoginResponse";

type AuthState = {
  loading: LoadingState;
  auth?: LoginResponse;
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
    }).addCase(LoginAsync.fulfilled, (state, action) => {
      state.loading = LoadingState.success;
      state.auth = action.payload;
    })
  }
});