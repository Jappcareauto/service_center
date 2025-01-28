import { RootState } from "@/app/store";

const invoices = (state: RootState) => state.invoices.invoicesState.invoices;
// const invoicePagination = (state: RootState) =>
//   state.invoices.invoicesState.pagination;
const allInvoiceloading = (state: RootState) =>
  state.invoices.invoicesState.loading;
const addInvoiceFormState = (state: RootState) => state.invoices.AddInvoiceForm;
const activeInvoice = (state: RootState) => state.invoices.activeInvoice;
export const invoiceSelector = {
  invoices,
  allInvoiceloading,
  addInvoiceFormState,
  activeInvoice,
};
