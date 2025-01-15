import { findInvoiceResponse } from "../useCase/findAllInvoice/findInvoiceResponse";

export interface InvoiceGateway {
  findAllInvoice: () => Promise<findInvoiceResponse[]>;
}
