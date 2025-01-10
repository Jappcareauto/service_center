import { AppStore } from "@/app/store";
import { RouteObject } from "react-router-dom";
import AppointmentExpandDetailsView from "../../ui/details/AppointmentExpandDetailsView";
import AppointmentsView from "../../ui/index/AppointmentsView";
import { WrappedRoute } from "@/app/routes/WrappedRoute";

export const AppointmentRoutes = {
  appointment: "/appointment",
  appointmentDetails: () => `/appointment/details`,
};

export const AppointmentRouter = (state: AppStore): RouteObject[] => {
  const globalState = state.getState();
  return [
    {
      path: AppointmentRoutes.appointment,
      element: <AppointmentsView />,
    },
    WrappedRoute({
      path: AppointmentRoutes.appointmentDetails(),
      element: <AppointmentExpandDetailsView />,
      canAccess: !!globalState?.appointment?.activeAppointment,
      redirectUrl: AppointmentRoutes.appointment,
    }),
  ];
};
