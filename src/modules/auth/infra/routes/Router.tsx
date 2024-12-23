import { AppStore } from "@/app/store";
import { RouteObject } from "react-router-dom";
import ForgotPasswordView from "../../ui/forgot-password/ForgotPasswordView";
import LoginView from "../../ui/login/LoginView";
import VerifyEmailView from "../../ui/verify-email/VerifyEmailView";
import ChangePasswordView from "../../ui/change-passwod/ChangePasswordView";

export const AuthRoutes = {
  login: '/login',
  verifyEmail: '/verify-email',
  forgotPassword: '/forgot-password',
  changePassword: '/change-password',
}


export const AuthRouter = (store: AppStore): RouteObject[] => {
  return [
    {
      path: AuthRoutes.login,
      element: <LoginView />,
    },
    {
      path: AuthRoutes.verifyEmail,
      element: <VerifyEmailView />,
    },
    {
      path: AuthRoutes.forgotPassword,
      element: <ForgotPasswordView />,
    },
    {
      path: AuthRoutes.changePassword,
      element: <ChangePasswordView />,
    }
  ]
} 