import { Invoice } from "../model/Invoice";
import { findInvoiceResponse } from "../useCase/findAllInvoice/findAllInvoiceResponse";
import { FormInvoiceSubmitModel } from "../validations/FormInvoiceSubmitModel";

export interface InvoiceGateway {
  findAllInvoice: () => Promise<findInvoiceResponse>;
  createOneInvoice: (command: FormInvoiceSubmitModel) => Promise<Invoice>;
}
