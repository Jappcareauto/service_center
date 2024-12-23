import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { AuthGateway } from "../../gateway/AuthGateway";
import { LoginCommand } from "../../usecases/login/LoginCommand";
import { LoginResponse } from "../../usecases/login/LoginResponse";
import { AuthApiRoutes } from "../routes/ApiRoutes";

export default class HttpAuthGateway extends HttpProvider implements AuthGateway {
  async login(command: LoginCommand): Promise<LoginResponse> {
    return this.postWithResult({
      url: AuthApiRoutes.login,
      command,
    })
  }
}