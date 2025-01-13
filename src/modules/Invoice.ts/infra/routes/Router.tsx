import { AppStore } from "@/app/store";
import InvoicesView from "../../ui/InvoicesView";
import { RouteObject } from "react-router-dom";
import InvoiceFormView from "../../ui/InvoiceFormView";

export const InvoiceRoutes = {
  invoices: () => "/invoices",
  createInvoice: () => "/invoice/createInvoice",
};

export const InvoiceRouter = (state: AppStore): RouteObject[] => {
  return [
    {
      path: InvoiceRoutes.invoices(),
      element: <InvoicesView />,
    },
    {
      path: InvoiceRoutes.createInvoice(),
      element: <InvoiceFormView />,
    },
  ];
};
