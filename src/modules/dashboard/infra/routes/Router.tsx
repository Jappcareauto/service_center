import { WrappedRoute } from "@/app/routes/WrappedRoute";
import { AppStore } from "@/app/store";
import { AppointmentRouter } from "@/modules/appointment/infra/routes/Router";
import { AuthRoutes } from "@/modules/auth/infra/routes/Router";
import { AuthSelectors } from "@/modules/auth/slices/AuthSelectors";
import EmergencyView from "@/modules/emergency/ui/index/EmergencyView";
import ProfileView from "@/modules/profile/ui/index/ProfileView";
import StatisticsView from "@/modules/statistics/ui/index/StatisticsView";
import DashboardLayout from "@/shared/generics/layouts/DashboardLayout";
import { Navigate, RouteObject } from "react-router-dom";
import DashboardView from "../../ui/DashboardView";

export const DashboardRoutes = {
  index: '/',
  dashboard: '/dashboard',
  emergency: '/emergency-assistance',
  profile: '/profile',
  statistics: '/statistics',
}


export const DashboardRouter = (store: AppStore): RouteObject[] => {
  const isLogin = AuthSelectors.isLogin(store.getState());
  return [
    WrappedRoute({
      canAccess: isLogin,
      redirectUrl: AuthRoutes.login,
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
        {
          path: DashboardRoutes.statistics,
          element: <StatisticsView />
        },
        {
          path: '',
          element: <Navigate to={DashboardRoutes.dashboard} />
        },
      ]
    }),
  ]
} 