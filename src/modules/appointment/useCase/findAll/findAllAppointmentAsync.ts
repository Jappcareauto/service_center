import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { FindAllResponse } from "./findAllAppointmentResponse";
import { getErrorState } from "@/shared/errors/getErrorState";
import { findAllServiceAsync } from "@/modules/service/usecase/findAllServiceCenter/findAllServiceCenterAsync";
import { FindAllVehicleAsync } from "@/modules/vehicle/useCase/findAllVehicle/findAllVehicleAsync";
import { FindAllUserAsync } from "@/modules/user/usecase/findAllUser/findAllUserAsync";
export const findAllAppointmentAsync = createAppAsyncThunk<FindAllResponse>(
  "/appointment/findOne",
  async (_, { extra: { AppointementGetway }, dispatch, rejectWithValue }) => {
    try {
      console.log("fetching appointments");
      const response = await AppointementGetway.findAll();
      // ------------------------service
      await dispatch(findAllServiceAsync()).unwrap();
      // -----------------------vehicle
      await dispatch(FindAllVehicleAsync()).unwrap();
      // ---------------------user
      await dispatch(FindAllUserAsync()).unwrap();

      return response;
    } catch (err) {
      return rejectWithValue(getErrorState(err));
    }
  }
);
