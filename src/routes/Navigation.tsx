import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../views/authentication/Login";
import ForgotPassword from "../views/authentication/ForgotPassword";
import ForgotPasswordConfirm from "../views/authentication/ForgotPasswordConfirm";

import Dashboard from "@/views/dashboard/Dashboard";
import Appointment from "@/views/dashboard/appointments/Appointments";
import EmergencyAssistance from "@/views/dashboard/EmergencyAssistance";
import Profile from "@/views/dashboard/Profile";
import Statistics from "@/views/dashboard/statistics/Statistics";
import Chat from "@/views/dashboard/chat/Chat";
import Invoices from "@/views/dashboard/invoices/Invoices";
import Payments from "@/views/dashboard/payments/Payments";

export const DashboardRoutes = {
    index: "/",
    dashboard: "/dashboard",
    emergency: "/emergency-assistance",
    profile: "/profile",
    statistics: "/statistics",
    chat: "/chat",
    chatDetails: "/chat/:id",
    setting: () => "/profile/setting",
};

export const AppointmentRoutes = {
    appointment: "/appointment",
    appointmentDetails: () => `/appointment/details`,
    calendar: () => "/appointment/calendar",
};

export const InvoiceRoutes = {
    invoices: () => "/invoices",
    createInvoice: (id?: string) => `/invoice/createInvoice/${id ? id : ":id"}`,
    invoiceDetail: (id?: string) => `/invoice/${id ? id : ":id"} `,
};

export const PaymentRoutes = {
    payment: () => "/payment",
};

const Navigation = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<AuthenticationLayout><Login /></AuthenticationLayout>} />
            <Route path="/forgot-password" element={<AuthenticationLayout><ForgotPassword /></AuthenticationLayout>} />
            <Route path="/forgot-password-confirm" element={<AuthenticationLayout><ForgotPasswordConfirm /></AuthenticationLayout>} />

            <Route element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path={DashboardRoutes.dashboard} element={<Dashboard />} />
                <Route path={AppointmentRoutes.appointment} element={<Appointment />} />
                <Route path={DashboardRoutes.emergency} element={<EmergencyAssistance />} />
                <Route path={DashboardRoutes.chat} element={<Chat />} />
                <Route path={DashboardRoutes.statistics} element={<Statistics />} />
                <Route path={InvoiceRoutes.invoices()} element={<Invoices />} />
                <Route path={DashboardRoutes.profile} element={<Profile />} />
                <Route path={DashboardRoutes.setting()} element={<Profile />} />
                <Route path={PaymentRoutes.payment()} element={<Payments />} />
            </Route>
        </Route>
    )
)

export default Navigation;