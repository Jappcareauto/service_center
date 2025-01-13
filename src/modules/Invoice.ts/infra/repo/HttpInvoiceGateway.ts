import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { InvoiceGateway } from "../../gateway/InvoiceGateway";
import { findAllInvoiceResponse } from "../../useCase/findAllInvoice/findInvoiceResponse";
import { InvoiceApiRoute } from "../routes/ApiRoutes";

export class HttpInvoiceGateway extends HttpProvider implements InvoiceGateway {
  async findAllInvoice(): Promise<findAllInvoiceResponse> {
    const response = await this.getWithResult({
      url: InvoiceApiRoute.findAll(),
    });
    return response;
  }
}
