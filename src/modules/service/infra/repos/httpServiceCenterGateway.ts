import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { ServiceGateway } from "../../gateway/serviceCenterGateway";
import { findAllServiceResponse } from "../../usecase/findAllServiceCenter/findAllServiceResponse";
import { ServiceApiRoute } from "../routes/ApiRoutes";

export class HttpServiceGateway extends HttpProvider implements ServiceGateway {
 async findAllService(): Promise<findAllServiceResponse> {
    const response = await this.getWithResult({
      url: ServiceApiRoute.findAll(),
    });
    return response;
  }
}
