import { WrappedRoute } from "@/app/routes/WrappedRoute";
import { AppStore } from "@/app/store";
import { DashboardRoutes } from "@/modules/dashboard/infra/routes/Router";
import { RouteObject } from "react-router-dom";
import { AuthSelectors } from "../../slices/AuthSelectors";
import ChangePasswordView from "../../ui/change-passwod/ChangePasswordView";
import ForgotPasswordView from "../../ui/forgot-password/ForgotPasswordView";
import LoginView from "../../ui/login/LoginView";
import VerifyEmailView from "../../ui/verify-email/VerifyEmailView";

export const AuthRoutes = {
  login: '/login',
  verifyEmail: '/verify-email',
  forgotPassword: '/forgot-password',
  changePassword: '/change-password',
}


export const AuthRouter = (_: AppStore): RouteObject[] => {
  const isLogin = AuthSelectors.isLogin(_.getState());
  return [
    WrappedRoute({
      canAccess: !isLogin,
      redirectUrl: DashboardRoutes.dashboard,
      path: AuthRoutes.login,
      element: <LoginView />,
    }),
    {
      path: AuthRoutes.verifyEmail,
      element: <VerifyEmailView />,
    },
    WrappedRoute({
      canAccess: !isLogin,
      redirectUrl: DashboardRoutes.dashboard,
      path: AuthRoutes.forgotPassword,
      element: <ForgotPasswordView />,
    }),
    {
      path: AuthRoutes.changePassword,
      element: <ChangePasswordView />,
    }
  ]
} 