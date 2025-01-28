import { RootState } from "@/app/store";
import { vehicleAdapter } from "./vehicleSlice";

const activeVehicle = (state: RootState) =>
  state.vehicle.activeVehicleState?.activeVehicle;

const loading = (state: RootState) => state.vehicle.activeVehicleState.loading;
const vehicles = (state: RootState) => state.vehicle.allVehiclesState.vehicles;
const allVehicleLoading = (state: RootState) =>
  state.vehicle.allVehiclesState.loading;
const vehicleAdapterSelector = vehicleAdapter.getSelectors<RootState>(
  (state) => state.vehicle.collections
);

export const vehicleSelector = {
  loading,
  activeVehicle,
  allVehicleLoading,
  vehicles,
  ...vehicleAdapterSelector,
};
