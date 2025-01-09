import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { FindAllResponse } from "./findAllAppointmentResponse";
import { getErrorState } from "@/shared/errors/getErrorState";
import { appointmentSliceAction } from "../../slices/AppointementSlice";
export const findAllAppointment = createAppAsyncThunk<FindAllResponse>(
  "/appointment/findOne",
  async (
    _,
    { extra: { AppointementGetway, vehicleGateWay }, rejectWithValue, dispatch }
  ) => {
    try {
      const response = await AppointementGetway.findAll();
      const vehicleData = await vehicleGateWay.FindAllVehicle();

      const updatedAppointments = response.data.map((appointment) => {
        const vehicle = vehicleData.data.find(
          (vehicle) => vehicle.id === appointment.vehicleId
        );

        return {
          ...appointment,
          vehicle,
        };
      });

      dispatch(
        appointmentSliceAction.updateAppointments({
          appointments: updatedAppointments,
        })
      );

      return { ...response, data: updatedAppointments };
    } catch (err) {
      return rejectWithValue(getErrorState(err));
    }
  }
);
