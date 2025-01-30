import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { InvoiceGateway } from "../../gateway/InvoiceGateway";
import { findInvoiceResponse } from "../../useCase/findAllInvoice/findAllInvoiceResponse";
import { InvoiceApiRoute } from "../routes/ApiRoutes";

export class HttpInvoiceGateway extends HttpProvider implements InvoiceGateway {
  async findAllInvoice(): Promise<findInvoiceResponse> {
    const response = await this.getWithResult({
      url:  InvoiceApiRoute.findAll(),
    });
    return response;
  }
}
