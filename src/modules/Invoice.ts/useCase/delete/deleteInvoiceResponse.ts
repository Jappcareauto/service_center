import { Invoice } from "../../model/Invoice";

export interface DeleteInvoiceResponse extends Invoice {
  id: string;
}
