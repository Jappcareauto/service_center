import { Pagination } from "@/shared/model/Pagination";
import { Invoice } from "../../model/Invoice";

export interface findInvoiceResponse  {
data:Invoice[]
  pagination: Pagination;
}
