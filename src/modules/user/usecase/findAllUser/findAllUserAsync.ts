import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { UserRouteApi } from "../../infra/routes/ApiRoute";
import { FindAllUserResponse } from "./findAllUserResponse";
import { getErrorState } from "@/shared/errors/getErrorState";

export const FindAllUserAsync = createAppAsyncThunk<FindAllUserResponse>(
  UserRouteApi.fetchAll(),
  async (_, { extra: { UserGateway }, rejectWithValue }) => {
    try {
      const response = UserGateway.findAllUser();
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
