import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { FindAllAppointmentStatsResponse } from "./findAllAppointmentResponse";
import { getErrorState } from "@/shared/errors/getErrorState";
import { appointmentStatsCommand } from "./findAllAppointmentStatsCommand";

export const findAllAppointmentStatsAsync =
  createAppAsyncThunk<FindAllAppointmentStatsResponse,appointmentStatsCommand>(
    "appointment/stats",
    async (command, { extra: { statsGateWay }, rejectWithValue }) => {
      console.log("fetching appointments thunk");
      console.log(command)
      try {
        const response = statsGateWay.findAllAppointmentStats(command);
        return response;
      } catch (err) {
        return rejectWithValue(getErrorState(err));
      }
    }
  );
