import { useAppDispatch } from "@/app/hooks";
import { DashboardRoutes } from "@/modules/dashboard/infra/routes/Router";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../infra/routes/Router";
import { InputLoginForm, InputLoginSchemaValidation } from "../../infra/validations/login/InputLoginSchemaValidation";
import { LoginAsync } from "../../usecases/login/LoginAsync";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<InputLoginForm>({
    resolver: zodResolver(InputLoginSchemaValidation)
  });

  const onSubmit: SubmitHandler<InputLoginForm> = (data) => {
    // navigate(AuthRoutes.verifyEmail);
    dispatch(LoginAsync(data))
      .unwrap()
      .then((_) => {
        navigate(DashboardRoutes.dashboard);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  const handleGoToForgotPassword = () => {
    navigate(AuthRoutes.forgotPassword);
  }

  return {
    form,
    onSubmit,
    handleGoToForgotPassword,
  };
}