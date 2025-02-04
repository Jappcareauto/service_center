import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { InvoiceGateway } from "../../gateway/InvoiceGateway";
import { findInvoiceResponse } from "../../useCase/findAllInvoice/findAllInvoiceResponse";
import { InvoiceApiRoute } from "../routes/ApiRoutes";
import { Invoice } from "../../model/Invoice";
import { FormInvoiceSubmitModel } from "../../validations/FormInvoiceSubmitModel";
import { DeleteInvoiceResponse } from "../../useCase/delete/deleteInvoiceResponse";

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

  async downloadInvoice(id: string): Promise<unknown> {
    const response = await this.download(InvoiceApiRoute.download(id));
    console.log("resposne", response);
    return response;
  }
  async deleteInvoice(id: string): Promise<DeleteInvoiceResponse> {
    const response = await this.deleteWithResult({
      url: InvoiceApiRoute.delete(id),
    });
    console.log("response", response);
    return response;
  }
}
