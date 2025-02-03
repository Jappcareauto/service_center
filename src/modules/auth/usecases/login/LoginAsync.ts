import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { getErrorState } from "@/shared/errors/getErrorState";
import { LoginCommand } from "./LoginCommand";
import { LoginResponse } from "./LoginResponse";
import { findSelfAsync } from "@/modules/user/usecase/findSelf/findSelfAsync";

export const LoginAsync = createAppAsyncThunk<LoginResponse, LoginCommand>(
  "auth/login",
  async (command, { extra: { authGateway }, rejectWithValue, dispatch }) => {
    try {
      const response = await authGateway.login(command);
      await dispatch(findSelfAsync());

      return response;
    } catch (err) {
      return rejectWithValue(getErrorState(err));
    }
  }
);
