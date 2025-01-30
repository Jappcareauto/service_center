import { AppStartListening } from "@/app/listenerMiddleware";
import { findAllInvoiceAsync } from "../useCase/findAllInvoice/FindAllInvoiceAsync";

export const invoiceMiddleware = (appListenning: AppStartListening) => {
  appListenning({
    actionCreator: findAllInvoiceAsync.fulfilled,
    effect: async () => {},
  });
};
