import { ErrorExceptionType } from "../exceptions/ErrorExceptionType";

export interface ErrorState {
  message: string,
  status: boolean,
  type: ErrorExceptionType;
}