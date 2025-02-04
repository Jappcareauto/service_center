import { RootState } from "@/app/store";
import { serviceCenterSelector } from "@/modules/service/slice/selectors";
import { createSelector } from "@reduxjs/toolkit";
import { emergencyAdapter } from "./emergencySlice";
import { vehicleSelector } from "@/modules/vehicle/slice/vehicleSelector";

const loading = (state: RootState) => state.emergency.loading;

const emergencyAdapterSelector = emergencyAdapter.getSelectors<RootState>(
  (state) => state.emergency.collection
);

const emergencyWithAll = createSelector(
  [
    serviceCenterSelector.selectAll,
    emergencyAdapterSelector.selectAll,
    vehicleSelector.selectAll,
  ],
  (serviceEntites, emergencyEntities, vehicleEntities) => {
    return emergencyEntities.map((emergency) => {
      const vehicle = vehicleEntities.find(
        (vehicle) => vehicle.id === emergency.vehicleId
      );
      const service = serviceEntites.find(
        (service) => service.id === emergency.vehicleId
      );

      return {
        ...emergency,
        vehicle,
        service,
      };
    });
  }
);

export type EmergencyWithAllModel = ReturnType<typeof emergencyWithAll>[number];

export const emergencySelector = {
  ...emergencyAdapterSelector,
  emergencyWithAll,
  loading,
};
