/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppStore } from "@/app/store";
import { RouteObject } from "react-router-dom";
import AppointmentExpandDetailsView from "../../ui/details/AppointmentExpandDetailsView";
import AppointmentsView from "../../ui/index/AppointmentsView";
import { WrappedRoute } from "@/app/routes/WrappedRoute";
import { CalendarView } from "../../ui/calendar/CalendarView";

export const AppointmentRoutes = {
  appointment: "/appointment",
  appointmentDetails: () => `/appointment/details`,
  calendar: () => "/appointment/calendar",
};

export const AppointmentRouter = (_state: AppStore): RouteObject[] => {
  return [
    {
      path: AppointmentRoutes.appointment,
      element: <AppointmentsView />,
    },
    WrappedRoute({
      path: AppointmentRoutes.appointmentDetails(),
      element: <AppointmentExpandDetailsView />,
      canAccess: true,
      redirectUrl: AppointmentRoutes.appointment,
    }),
    {
      path: AppointmentRoutes.calendar(),
      element: <CalendarView />,
    },
  ];
};
