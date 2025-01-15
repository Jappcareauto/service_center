import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { ServiceCenterApiRoute } from "../../infra/routes/ApiRoutes";
import { getErrorState } from "@/shared/errors/getErrorState";

export const findAllServiceenterAsync = createAppAsyncThunk(
  ServiceCenterApiRoute.findAll(),
  async (_, { extra: { serviceGateway }, rejectWithValue }) => {
    try {
      const response = await serviceGateway.findAllService();
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
