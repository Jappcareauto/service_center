import { ErrorException } from "./ErrorException";

export class InternetErrorException extends ErrorException {
  constructor(msg?: string) {
    super(
      msg ??
      "Nous rencontrons des problèmes avec votre connexion internet"
    );
    this.type = "InvalidEmailErrorException";
  }
}