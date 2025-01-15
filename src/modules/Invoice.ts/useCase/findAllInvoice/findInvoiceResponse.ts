import { Invoice } from "../../model/Invoice";

export interface findInvoiceResponse extends Invoice {
  id: string;
  // pagination: Pagination;
}
