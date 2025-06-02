import { ReactNode, lazy } from "react";
import { paths } from "./paths";

export type route = {
  path: string;
  component: React.LazyExoticComponent<() => ReactNode>;
  isProtected: boolean;
};

export const routes: route[] = [
  {
    path: paths.index,
    component: lazy(() => import("../pages/login/Login.page")),
    isProtected: false,
  },
  {
    path: paths.forgotPassword,
    component: lazy(
      () => import("../pages/forgot-password/ForgotPassword.page")
    ),
    isProtected: false,
  },
  {
    path: paths.resetPassword,
    component: lazy(() => import("../pages/reset-password/ResetPassword.page")),
    isProtected: false,
  },
  {
    path: paths.dashboard,
    component: lazy(() => import("../pages/dashboard/Dashboard.page")),
    isProtected: true,
  },
  {
    path: paths.appointments,
    component: lazy(() => import("../pages/appointments/Appointments.page")),
    isProtected: true,
  },
  {
    path: paths.appointmentDetails,
    component: lazy(
      () => import("../pages/appointment-details/AppointmentDetails.page")
    ),
    isProtected: true,
  },
  {
    path: paths.emergency,
    component: lazy(() => import("../pages/emergency/Emergency.page")),
    isProtected: true,
  },
  {
    path: paths.chat,
    component: lazy(() => import("../pages/chat/Chat.page")),
    isProtected: true,
  },
  {
    path: paths.statistics,
    component: lazy(() => import("../pages/statistics/Statistics.page")),
    isProtected: true,
  },
  {
    path: paths.invoices,
    component: lazy(() => import("../pages/invoices/Invoices.page")),
    isProtected: true,
  },
  {
    path: paths.billing,
    component: lazy(() => import("../pages/billing/Billing.page")),
    isProtected: true,
  },
  {
    path: paths.downloadInvoice,
    component: lazy(() => import("../pages/download-invoice/DownloadInvoice.page")),
    isProtected: true,
  },
  {
    path: paths.invoiceDetails,
    component: lazy(
      () => import("../pages/invoice-details/InvoiceDetails.page")
    ),
    isProtected: true,
  },
  {
    path: paths.payments,
    component: lazy(
      () => import("../pages/payments/Payments.page")
    ),
    isProtected: true,
  },
  {
    path: paths.createInvoice,
    component: lazy(() => import("../pages/create-invoice/CreateInvoice.page")),
    isProtected: true,
  },
  {
    path: paths.updateInvoice,
    component: lazy(() => import("../pages/update-invoice/UpdateInvoice.page")),
    isProtected: true,
  },
  {
    path: paths.profile,
    component: lazy(() => import("../pages/profile/Profile.page")),
    isProtected: true,
  },
  {
    path: paths.calendar,
    component: lazy(() => import("../pages/calendar/Calendar.page")),
    isProtected: true,
  },
];
