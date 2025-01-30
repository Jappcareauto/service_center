import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { InvoiceGateway } from "../../gateway/InvoiceGateway";
import { findInvoiceResponse } from "../../useCase/findAllInvoice/findAllInvoiceResponse";
import { InvoiceApiRoute } from "../routes/ApiRoutes";
import { Invoice } from "../../model/Invoice";
import { FormInvoiceSubmitModel } from "../../validations/FormInvoiceSubmitModel";

export class HttpInvoiceGateway extends HttpProvider implements InvoiceGateway {
  async findAllInvoice(): Promise<findInvoiceResponse> {
    const response = await this.getWithResult({
      url: InvoiceApiRoute.findAll(),
    });
    return response;
  }
  async createOneInvoice(command: FormInvoiceSubmitModel): Promise<Invoice> {
    const response = await this.postWithResult({
      command,
      url: InvoiceApiRoute.createOne(),
    });
    return response;
  }
}
