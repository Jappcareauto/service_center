import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { ServiceApiRoute } from "../../infra/routes/ApiRoutes";
import { getErrorState } from "@/shared/errors/getErrorState";
import { findAllServiceResponse } from "./findAllServiceResponse";

export const findAllServiceAsync = createAppAsyncThunk<findAllServiceResponse>(
  ServiceApiRoute.findAll(),
  async (_, { extra: { serviceGateway }, rejectWithValue }) => {
    try {
      const response = await serviceGateway.findAllService();
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
