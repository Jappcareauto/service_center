import { Pagination } from "@/shared/model/Pagination";
import { Appointment } from "../../model/Appointment";

export interface FindAllResponse {
  data: Appointment[];
  pagination: Pagination;
}
