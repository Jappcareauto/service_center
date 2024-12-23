import { ErrorException } from "./ErrorException";

export default class NotFoundException extends ErrorException {
  constructor(msg?: string) {
    super(msg ?? 'Élement introuvable');
    this.type = "NotFoundException";
  }
}