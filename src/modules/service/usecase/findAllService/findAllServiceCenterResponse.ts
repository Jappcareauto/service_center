import { Pagination } from "@/shared/model/Pagination";
import { ServiceCenter } from "../../model/ServiceCenter";

export interface findAllServiceCenterResponse {
  data: ServiceCenter[];
  pagination: Pagination;
}
