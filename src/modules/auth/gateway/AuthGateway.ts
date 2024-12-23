import { LoginCommand } from "../usecases/login/LoginCommand";
import { LoginResponse } from "../usecases/login/LoginResponse";

export interface AuthGateway {
  login: (command: LoginCommand) => Promise<LoginResponse>;
}