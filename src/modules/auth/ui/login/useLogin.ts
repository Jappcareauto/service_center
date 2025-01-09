import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { DashboardRoutes } from "@/modules/dashboard/infra/routes/Router";
import { LoadingState } from "@/shared/enums/LoadingState";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../infra/routes/Router";
import { InputLoginForm, InputLoginSchemaValidation } from "../../infra/validations/login/InputLoginSchemaValidation";
import { AuthSelectors } from "../../slices/AuthSelectors";
import { LoginAsync } from "../../usecases/login/LoginAsync";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(AuthSelectors.loading);
  const navigate = useNavigate();
  const form = useForm<InputLoginForm>({
    resolver: zodResolver(InputLoginSchemaValidation)
  });

  const onSubmit: SubmitHandler<InputLoginForm> = (data) => {
    // navigate(AuthRoutes.verifyEmail);
    dispatch(LoginAsync(data))
      .unwrap()
      .then((_) => {

        window.open(DashboardRoutes.dashboard, '_self');
        
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
    loading: loading === LoadingState.pending,
  };
}