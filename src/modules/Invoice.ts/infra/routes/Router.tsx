/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppStore } from "@/app/store";
import InvoicesView from "../../ui/InvoicesView";
import { RouteObject } from "react-router-dom";
import InvoiceFormView from "../../ui/InvoiceFormView";
import { WrappedRoute } from "@/app/routes/WrappedRoute";
import InvoiceDetail from "../../ui/InvoiceDetailView";
import ErrorBoundary from "@/app/ErrorBoundary";

export const InvoiceRoutes = {
  invoices: () => "/invoices",
  createInvoice: (id?: string) => `/invoice/createInvoice/${id ? id : ":id"}`,
  invoiceDetail: (id?: string) => `/invoice/${id ? id : ":id"} `,
};

export const InvoiceRouter = (_state: AppStore): RouteObject[] => {
  return [
    {
      path: InvoiceRoutes.invoices(),
      element: <InvoicesView />,
    },
    {
      path: InvoiceRoutes.createInvoice(),
      element: <InvoiceFormView />,
    },
    WrappedRoute({
      canAccess: true,
      redirectUrl: InvoiceRoutes.invoices(),
      path: InvoiceRoutes.invoiceDetail(),
      element: (
        <ErrorBoundary>
          <InvoiceDetail />,
        </ErrorBoundary>
      ),
    }),
  ];
};
