import { VehicleMediaItem } from "./vehicleMediaItem";

  export interface VehicleMedia  {
    type: string;
    source: string;
    items: VehicleMediaItem[];
  }