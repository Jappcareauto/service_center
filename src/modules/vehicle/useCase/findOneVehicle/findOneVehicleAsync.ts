import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { FindOneVehicleResponse } from "./findOneVehicleResponse";
import { getErrorState } from "@/shared/errors/getErrorState";

export const findOneVehicleAsync = createAppAsyncThunk<
  FindOneVehicleResponse,
  string
>("/vehicle/findOne", async (command, { extra: { vehicleGateWay }, rejectWithValue }) => {
  try {
    const response = vehicleGateWay.FindOneVehicle(command);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorState(error));
  }
});
