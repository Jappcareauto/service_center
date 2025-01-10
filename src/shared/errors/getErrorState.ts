import { ErrorState } from "./ErrorState";

export const getErrorState = (error:any): ErrorState => {
  return {
    message: error.message,
    status: false,
    type: error.type,
  };
}