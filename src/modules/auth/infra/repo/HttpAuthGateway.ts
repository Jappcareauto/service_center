import { LocalStorageKey } from "@/shared/enums/LocalStorageKey";
import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { AuthGateway } from "../../gateway/AuthGateway";
import { LoginCommand } from "../../usecases/login/LoginCommand";
import { LoginResponse } from "../../usecases/login/LoginResponse";
import { AuthApiRoutes } from "../routes/ApiRoutes";

export default class HttpAuthGateway extends HttpProvider implements AuthGateway {
  async   login(command: LoginCommand): Promise<LoginResponse> {
    const response = await this.postWithResult({
      url: AuthApiRoutes.login,
      command,
    });

    const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = response;

    localStorage.setItem(LocalStorageKey.AUTH_ACCESS, JSON.stringify({
      accessToken,
      refreshToken,
      accessTokenExpiry,
      refreshTokenExpiry,
    }));

    return {
      userId: response.authorities.authorities.userId,
      authorities: {
        roles: response.authorities.authoritiesClear.ROLE,
        permissions: response.authorities.authoritiesClear.PERMISSION,
      }
    }
  }
}