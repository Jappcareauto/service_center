import { AuthRouter } from "@/modules/auth/infra/routes/Router";
import { DashboardRouter } from "@/modules/dashboard/infra/routes/Router";
import { createBrowserRouter } from "react-router-dom";
import { AppStore } from "../store";

export const createRouter = ({ store }: { store: AppStore }) => {
  return createBrowserRouter([...AuthRouter(store), ...DashboardRouter(store)]);
};

export type AppRouter = ReturnType<typeof createRouter>;
