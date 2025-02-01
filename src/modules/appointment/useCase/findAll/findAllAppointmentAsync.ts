import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { FindAllResponse } from "./findAllAppointmentResponse";
import { getErrorState } from "@/shared/errors/getErrorState";
export const findAllAppointmentAsync = createAppAsyncThunk<FindAllResponse>(
  "/appointment/findOne",
  async (_, { extra: { AppointementGetway }, rejectWithValue }) => {
    try {
      console.log("fetching appointments");
      const response = await AppointementGetway.findAll();
      console.log("response", response);
      return response;
    } catch (err) {
      return rejectWithValue(getErrorState(err));
    }
  }
);
