import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { AppointmentApiRoutes } from "@/modules/appointment/infra/routes/ApiRoutes";
import { UpdateAppointmentStatusComand } from "./updateAppointmentStatusCommand";
import { Appointment } from "@/modules/appointment/model/Appointment";

export const updateAppointmentStatusAsync = createAppAsyncThunk<
  Appointment,
  UpdateAppointmentStatusComand
>(
  AppointmentApiRoutes.updateStatus("status"),
  async (command, { extra: { AppointementGetway }, rejectWithValue }) => {
    try {
      const response = await AppointementGetway.updateStatus(command);
      return response;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);
