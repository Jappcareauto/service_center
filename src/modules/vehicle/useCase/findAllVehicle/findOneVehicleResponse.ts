import { Pagination } from "@/shared/model/Pagination";
import { Vehicle } from "../../model/vehicle";

export interface findAllVehicleResponse {
  data: Vehicle[];
  pagination: Pagination;
}
