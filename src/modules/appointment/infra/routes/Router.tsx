import { AppStore } from "@/app/store";
import { RouteObject } from "react-router-dom";
import AppointmentExpandDetailsView from "../../ui/details/AppointmentExpandDetailsView";
import AppointmentsView from "../../ui/index/AppointmentsView";

export const AppointmentRoutes = {
  appointment: '/appointment',
  appointmentDetails: '/appointment/details'
}


export const AppointmentRouter = (_: AppStore): RouteObject[] => {
  return [
    {
      path: AppointmentRoutes.appointment,
      element: <AppointmentsView />,
    },
    {
      path: AppointmentRoutes.appointmentDetails,
      element: <AppointmentExpandDetailsView />,
    },
  ]
} 