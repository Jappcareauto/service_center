import { findInvoiceResponse } from "../useCase/findAllInvoice/findAllInvoiceResponse";

export interface InvoiceGateway {
  findAllInvoice: () => Promise<findInvoiceResponse>;
}
