import { Invoice } from "../model/Invoice";
import { DeleteInvoiceResponse } from "../useCase/delete/deleteInvoiceResponse";
import { findInvoiceResponse } from "../useCase/findAllInvoice/findAllInvoiceResponse";
import { FormInvoiceSubmitModel } from "../validations/FormInvoiceSubmitModel";

export interface InvoiceGateway {
  findAllInvoice: () => Promise<findInvoiceResponse>;
  createOneInvoice: (command: FormInvoiceSubmitModel) => Promise<Invoice>;
  downloadInvoice: (id: string) => Promise<unknown>;
  deleteInvoice: (id: string) => Promise<DeleteInvoiceResponse>;
}
