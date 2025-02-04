import { ErrorException } from "./ErrorException";

export class InternetErrorException extends ErrorException {
  constructor(msg?: string) {
    super(msg ?? "Please your network connexion");
    this.type = "InvalidEmailErrorException";
  }
}
