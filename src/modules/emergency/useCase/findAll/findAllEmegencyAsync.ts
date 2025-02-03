import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { FindAllEmergencyResponse } from "./findAllEmergencyResponse";
import { emergencyApiRoutes } from "../../infra/router/Router";
import { getErrorState } from "@/shared/errors/getErrorState";
import { FindAllVehicleAsync } from "@/modules/vehicle/useCase/findAllVehicle/findAllVehicleAsync";
import { findAllServiceAsync } from "@/modules/service/usecase/findAllServiceCenter/findAllServiceCenterAsync";

export const findAllEmergencyAsync =
  createAppAsyncThunk<FindAllEmergencyResponse>(
    emergencyApiRoutes.findAll(),
    async (_, { extra: { emergencyGateway }, dispatch, rejectWithValue }) => {
      try {
        const response = await emergencyGateway.findAllEmergency();
        await dispatch(FindAllVehicleAsync()).unwrap();
        await dispatch(findAllServiceAsync()).unwrap();
        return response;
      } catch (error) {
        return rejectWithValue(getErrorState(error));
      }
    }
  );


