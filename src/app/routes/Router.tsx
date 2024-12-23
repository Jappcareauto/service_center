import { AuthRouter, AuthRoutes } from "@/modules/auth/infra/routes/Router";
import { DashboardRouter } from "@/modules/dashboard/infra/routes/Router";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppStore } from "../store";

export const createRouter = ({ store }: { store: AppStore }) => createBrowserRouter([
  ...AuthRouter(store),
  ...DashboardRouter(store),
  {
    path: '/',
    element: <Navigate to={AuthRoutes.login} />
  }
]);

export type AppRouter = ReturnType<typeof createRouter>;