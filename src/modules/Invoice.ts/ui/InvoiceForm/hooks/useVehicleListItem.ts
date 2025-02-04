import { useAppSelector } from "@/app/hooks";
import { Vehicle } from "@/modules/vehicle/model/vehicle";
import { vehicleSelector } from "@/modules/vehicle/slice/vehicleSelector";
import { FormListItemModel } from "@/shared/model/FormListItem";
import { useState } from "react";

export const useVehicleListItem = () => {
  const vehicles = useAppSelector(vehicleSelector.vehicles);
  const [activeVehice, setActiveVehicle] = useState<FormListItemModel>({
    description: vehicles?.[0]?.vin || "",
    id: vehicles?.[0]?.id || "",
    name: vehicles?.[0]?.name || "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const toogleVehicleList = () => {
    setIsOpen((prev) => !prev);
  };
  const handleActiveVehicle = (vehicle: Vehicle) => {
    setActiveVehicle({
      description: vehicle.description,
      id: vehicle.id,
      name: vehicle.name,
    });
    toogleVehicleList();
  };

  return {
    state: {
      vehicles,
      activeVehice,
      isOpen,
    },
    action: {
      handleActiveVehicle,
      toogleVehicleList,
    },
  };
};
