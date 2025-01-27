import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { UserRouteApi } from "../../infra/routes/ApiRoute";
import { FindSelfResponse } from "./findSelfResponse";
import { getErrorState } from "@/shared/errors/getErrorState";

export const findSelfAsync = createAppAsyncThunk<FindSelfResponse>(
  UserRouteApi.findSelf(),
  async (_, { extra: { UserGateway }, rejectWithValue }) => {
    try {
      const response = await UserGateway.findSelf();
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
