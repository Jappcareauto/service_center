import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { getErrorState } from "@/shared/errors/getErrorState";
import { LoginCommand } from "./LoginCommand";
import { LoginResponse } from "./LoginResponse";

export const LoginAsync = createAppAsyncThunk<LoginResponse, LoginCommand>(
  "auth/login",
  async (command, { extra: { authGateway }, rejectWithValue }) => {
    try {
      const response = await authGateway.login(command);
      return response;
    } catch (err) {
      return rejectWithValue(getErrorState(err)); 
    }
  }
);
