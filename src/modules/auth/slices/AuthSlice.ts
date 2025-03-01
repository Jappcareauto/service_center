import { LoadingState } from "@/shared/enums/LoadingState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginAsync } from "../usecases/login/LoginAsync";
import { LoginResponse } from "../usecases/login/LoginResponse";

type AuthState = {
  loading: LoadingState;
  auth?: LoginResponse;
  errorMessage? : string;
}

const initialState: AuthState = {
  loading: LoadingState.idle,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      state.loading = action.payload;
    },
    setAuth: (state, action: PayloadAction<LoginResponse>) => {
      state.auth = action.payload; 
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
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

export const { setLoading, setErrorMessage, clearErrorMessage, setAuth } = AuthSlice.actions