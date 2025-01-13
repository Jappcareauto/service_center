import { findAllInvoiceResponse } from "../useCase/findAllInvoice/findInvoiceResponse";

export interface InvoiceGateway {
  findAllInvoice: () => Promise<findAllInvoiceResponse>;
}
