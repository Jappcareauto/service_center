import { LoadingState } from "@/shared/enums/LoadingState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginAsync } from "../usecases/login/LoginAsync";
import { LoginResponse } from "../usecases/login/LoginResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/services/api-client"
import { AuthRoutes } from '@/modules/auth/infra/routes/Router';

type AuthState = {
  loading: LoadingState;
  auth?: LoginResponse;
  errorMessage? : string;
  serviceCenterId? : String
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
    setServiceCenterId: (state, action: PayloadAction<string>) => {
      state.serviceCenterId = action.payload;
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

export const getUserServiceCenter = createAsyncThunk(
  'auth/getUserServiceCenter',
  async (userID: string, { dispatch }) => {
    const response = await httpClient.get(`/service-center?ownerId=${userID}`);
    if (response.data.data.length > 0) {
      dispatch(setServiceCenterId(response.data.data[0].id));
      return response.data.data[0];
    }else{
      dispatch(setErrorMessage("No service center found for this user"));
      // reset auth state and redirect to login
      localStorage.clear();
      window.open(AuthRoutes.login, "_self");

      return null;
    }
  }
);

export const { setLoading, setErrorMessage, clearErrorMessage, setAuth, setServiceCenterId } = AuthSlice.actions