import { Pagination } from "@/shared/model/Pagination";
import { User } from "../../models/User";

export interface FindAllUserResponse {
  data: User[];
  pagination: Pagination;
}
