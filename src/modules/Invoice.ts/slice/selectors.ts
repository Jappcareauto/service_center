import { RootState } from "@/app/store";
import { invoiceAdapter } from "./invoiceSlice";
import { createSelector } from "@reduxjs/toolkit";
import { userSelector } from "@/modules/user/slice/selectors";
import { AppointementSelector } from "@/modules/appointment/slices/AppointenmentSelector";

const invoices = (state: RootState) => state.invoices.invoicesState.invoices;
// const invoicePagination = (state: RootState) =>
//   state.invoices.invoicesState.pagination;
const allInvoiceloading = (state: RootState) =>
  state.invoices.invoicesState.loading;
const addInvoiceFormState = (state: RootState) => state.invoices.AddInvoiceForm;
const activeInvoice = (state: RootState) => state.invoices.activeInvoice;
const createInvoiceState = ((state:RootState)=>state.invoices.createInvoceState)
const invoiceAdapterSelector = invoiceAdapter.getSelectors<RootState>(
  (state) => state.invoices.collections
);

 const invoiceWithAll = createSelector(
  [
    invoiceAdapterSelector.selectAll,
    userSelector.selectAll,
    AppointementSelector.selectAll,
  ],
  (invoicesEntites, userEntities, appointmentEntities) =>
    invoicesEntites.map((invoice) => {
      const billedFromUser = userEntities.find(
        (user) => user.id === invoice.billedFromUserId
      );
      const billedToUser = userEntities.find(
        (user) => user.id === invoice.billedToUserId
      );
      const appointment = appointmentEntities.find(
        (appointment) => appointment.id === invoice.appointmentId
      );
      return { ...invoice, billedFromUser, billedToUser, appointment };
    })
);

export const invoiceSelector = {
  invoices,
  allInvoiceloading,
  addInvoiceFormState,
  activeInvoice,
  createInvoiceState,
  ...invoiceAdapterSelector,invoiceWithAll
};
