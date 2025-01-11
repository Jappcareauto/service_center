import { Audit } from "@/shared/model/Audit";
import { VehicleDetail } from "./vehicleDetail";
import { VehicleMedia } from "./vehicleMedia";

  export interface Vehicle extends Audit {
    name: string;
    description: string 
    detail: VehicleDetail;
    garageId: string;
    imageUrl: string 
    media: VehicleMedia;
    registrationNumber: string
    vin: string ;
  }
  