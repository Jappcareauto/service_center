import { ROLES } from "@/enums";
import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  user_info: User | null;
  refreshToken: string;
  accessToken: string;
  role: ROLES;
  lastLogin: string;
  serviceCenterId: string;
  shouldRedirect: boolean;
}

const initialState: AuthState = {
  user: null,
  user_info: null,
  refreshToken: "",
  accessToken: "",
  role: ROLES.ROLE_SERVICE_MANAGER,
  lastLogin: "",
  serviceCenterId: "",
  shouldRedirect: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setUserInfo: (state, { payload }) => {
      state.user_info = payload;
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload;
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    logoutUser: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.user = null;
      state.shouldRedirect = true;
      state.user_info = null;
      state.lastLogin = '';
      state.serviceCenterId = '';
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setLastLogin: (state, { payload }) => {
      state.lastLogin = payload;
    },
    setServiceCenterId: (state, { payload }) => {
      state.serviceCenterId = payload;
    },
  },
});

export const {
  setUser,
  setRefreshToken,
  setAccessToken,
  logoutUser,
  setRole,
  setLastLogin,
  setUserInfo,
  setServiceCenterId
} = authSlice.actions;

export default authSlice.reducer;
