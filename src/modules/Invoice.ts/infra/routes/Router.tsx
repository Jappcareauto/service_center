import { AppStore } from "@/app/store";
import InvoicesView from "../../ui/InvoicesView";
import { RouteObject, useParams } from "react-router-dom";
import InvoiceFormView from "../../ui/InvoiceFormView";
import { WrappedRoute } from "@/app/routes/WrappedRoute";
import InvoiceDetail from "../../ui/InvoiceDetailView";

export const InvoiceRoutes = {
  invoices: () => "/invoices",
  createInvoice: (id?: string) => `/invoice/createInvoice/${id ? id : ":id"}`,
  invoiceDetail: (id?: string) => `/invoice/${id ? id : ":id"} `,
};

export const InvoiceRouter = (state: AppStore): RouteObject[] => {
  const param = useParams();
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
      element: <InvoiceDetail />,
    }),
  ];
};
