import { Vehicle } from "@/modules/vehicle/model/vehicle";
import { Audit } from "./Audit";
import { Location } from "./Location";

export interface Garage extends Audit {
    name: string;
    location: Location;
    owner: string;
    vehicles: Vehicle[];
    image: File;
}