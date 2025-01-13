import { Pagination } from "@/shared/model/Pagination";
import { Invoice } from "../../model/Invoice";

export interface findAllInvoiceResponse {
  data: Invoice[];
  pagination: Pagination;
}
