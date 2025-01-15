import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { ServiceGateway } from "../../gateway/serviceCenterGateway";
import { findAllServiceCenterResponse } from "../../usecase/findAllService/findAllServiceCenterResponse";
import { ServiceCenterApiRoute } from "../routes/ApiRoutes";

export class HttpServiceGateway extends HttpProvider implements ServiceGateway {
 async findAllService(): Promise<findAllServiceCenterResponse> {
    const response = await this.getWithResult({
      url: ServiceCenterApiRoute.findAll(),
    });
    return response;
  }
}
