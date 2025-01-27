import { Pagination } from "@/shared/model/Pagination";
import { Service } from "../../model/Service";

export interface findAllServiceResponse {
  data: Service[];
  pagination: Pagination;
}
