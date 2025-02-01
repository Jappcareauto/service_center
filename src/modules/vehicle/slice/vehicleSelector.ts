import { RootState } from "@/app/store";

const activeVehicle = (state: RootState) =>
  state.vehicle.activeVehicleState?.activeVehicle;

const loading = (state: RootState) => state.vehicle.activeVehicleState.loading;
const vehicles = (state: RootState) => state.vehicle.allVehiclesState.vehicles;
const allVehicleLoading = (state: RootState) =>
  state.vehicle.allVehiclesState.loading;
export const vehicleState = {
  loading,
  activeVehicle,
  allVehicleLoading,
  vehicles,
};
