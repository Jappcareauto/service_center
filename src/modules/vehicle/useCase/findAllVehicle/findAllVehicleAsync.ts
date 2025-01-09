import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { findAllVehicleResponse } from "./findOneVehicleResponse";
import { getErrorState } from "@/shared/errors/getErrorState";

export const FindAllVehicleAsync = createAppAsyncThunk<findAllVehicleResponse>(
  "/findAllVehicle/list",
  async (_, { extra: { vehicleGateWay }, rejectWithValue }) => {
    try {
      const response = vehicleGateWay.FindAllVehicle();
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
