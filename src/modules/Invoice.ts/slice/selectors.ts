import { RootState } from "@/app/store";

const invoice = (state: RootState) => state.invoices.invoicesState.invoices;
// const invoicePagination = (state: RootState) =>
//   state.invoices.invoicesState.pagination;
const allInvoiceloading = (state: RootState) =>
  state.invoices.invoicesState.loading;
const addInvoiceFormState = (state: RootState) => state.invoices.AddInvoiceForm;

export const invoiceSelector = {
  invoice,
  allInvoiceloading,
  addInvoiceFormState,
};
