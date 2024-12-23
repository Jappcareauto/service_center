import { AppStore } from "@/app/store";
import { AppointmentRouter } from "@/modules/appointment/infra/routes/Router";
import EmergencyView from "@/modules/emergency/ui/index/EmergencyView";
import ProfileView from "@/modules/profile/ui/index/ProfileView";
import DashboardLayout from "@/shared/generics/layouts/DashboardLayout";
import { RouteObject } from "react-router-dom";
import DashboardView from "../../ui/DashboardView";

export const DashboardRoutes = {
  index: '/',
  dashboard: '/dashboard',
  emergency: '/emergency-assistance',
  profile: '/profile',
}


export const DashboardRouter = (store: AppStore): RouteObject[] => {
  return [
    {
      path: DashboardRoutes.index,
      element: <DashboardLayout />,
      children: [
        {
          path: DashboardRoutes.dashboard,
          element: <DashboardView />
        },
        ...AppointmentRouter(store),
        {
          path: DashboardRoutes.emergency,
          element: <EmergencyView />
        },
        {
          path: DashboardRoutes.profile,
          element: <ProfileView />
        },
      ]
    },
  ]
} 