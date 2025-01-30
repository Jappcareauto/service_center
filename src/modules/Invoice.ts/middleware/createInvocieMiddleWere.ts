import { AppStartListening } from "@/app/listenerMiddleware";
import { createInvoiceAsync } from "../useCase/createInvoice/createInvoiceAsync";
import { invoiceSliceAction } from "../slice/invoiceSlice";

export const createInvoiceMiddleware = (lintener: AppStartListening) => {
  lintener({
    actionCreator: createInvoiceAsync.fulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.dispatch(
        invoiceSliceAction.addOne({ invoice: action.payload })
      );
    },
  });
};
