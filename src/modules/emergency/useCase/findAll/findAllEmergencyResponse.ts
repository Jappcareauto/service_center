import { Pagination } from "@/shared/model/Pagination";
import { EmergencyModel } from "../../ui/models/EmergencyModel";

export interface FindAllEmergencyResponse {
  data: EmergencyModel[] ;
  pagination: Pagination;
}
