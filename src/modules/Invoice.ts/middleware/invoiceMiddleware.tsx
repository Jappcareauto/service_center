import { AppStartListening } from "@/app/listenerMiddleware";
import { findAllInvoiceAsync } from "../useCase/findAllInvoice/FindAllInvoiceAsync";
import { FindAllUserAsync } from "@/modules/user/usecase/findAllUser/findAllUserAsync";
import { Invoice } from "../model/Invoice";
import { invoiceSliceAction } from "../slice/invoiceSlice";

export const invoiceMiddleware
 = (appListenning: AppStartListening) => {
  appListenning({
    actionCreator: findAllInvoiceAsync.fulfilled,
    effect: async ({ payload }, listenerApi) => {
      const response = await listenerApi.dispatch(FindAllUserAsync()).unwrap();
      const user = response.data;

      const appState = listenerApi.getState();

      const appointments = appState.appointment.appointments;

      const updatedInvoices: Invoice[] = payload.data.map((invoice) => {
        const billedToUser = user.find(
          (user) => user.id === invoice.billedToUserId
        );
        const billedFromUser = user.find(
          (user) => user.id === invoice.billedFromUserId
        );
        const appointment = appointments?.find(
          (appointment) => appointment.id === invoice.appointmentId
        );

        return {
          ...invoice,
          billedFromUser,
          billedToUser,
          appointment,
        };
      });
      listenerApi.dispatch(
        invoiceSliceAction.updateInvoices({ invoices: updatedInvoices })
      );
      console.log("updatedInvoces", updatedInvoices);
    },
  });
};
