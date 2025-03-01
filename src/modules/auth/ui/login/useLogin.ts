import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { DashboardRoutes } from "@/modules/dashboard/infra/routes/Router";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../infra/routes/Router";
import {
  InputLoginForm,
  InputLoginSchemaValidation,
} from "../../infra/validations/login/InputLoginSchemaValidation";
import { AuthSelectors } from "../../slices/AuthSelectors";
import { LoadingState } from "@/shared/enums/LoadingState";
import { clearErrorMessage, setErrorMessage, setLoading, setAuth } from "../../slices/AuthSlice";
import httpClient from "@/services/api-client"
import { findSelfAsync } from "@/modules/user/usecase/findSelf/findSelfAsync";
import { LocalStorageKey } from "@/shared/enums/LocalStorageKey";
import { Roles } from "../../models/Roles";
import { Permissions } from "../../models/Permissions";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  authorities: {
    userId: string;
    authorities: {
      ROLE: string[];
      PERMISSION: string[];
    };
    authoritiesClear: {
      ROLE: string[];
      PERMISSION: string[];
    };
  };
}

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(AuthSelectors.loading);
  const errorMessage = useAppSelector(AuthSelectors.errorMessage);
  const navigate = useNavigate();
  const form = useForm<InputLoginForm>({
    resolver: zodResolver(InputLoginSchemaValidation),
  });

  const onSubmit: SubmitHandler<InputLoginForm> = async (data) => {
    // navigate(AuthRoutes.verifyEmail);
    // dispatch(LoginAsync(data))
    //   .unwrap()
    //   .then((_) => {
    //     window.open(DashboardRoutes.dashboard, "_self");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    dispatch(setLoading(LoadingState.pending))
    dispatch(clearErrorMessage())
    try {
      const response = await httpClient.post<LoginResponse>('/auth/login', data);
      console.log(response);

      // Check if the user has the ROLE_SERVICE_MANAGER role
      const roles = response.data.authorities.authorities.ROLE;
      const hasServiceManagerRole = true; // roles.includes('ROLE_SERVICE_MANAGER');
     
      if (!hasServiceManagerRole) {
        dispatch(setErrorMessage("You are not authorized to access this"))
        dispatch(setLoading(LoadingState.failed));
        return
      }else{
        const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = response.data;

        localStorage.setItem(LocalStorageKey.AUTH_ACCESS, JSON.stringify({
          accessToken,
          refreshToken,
          accessTokenExpiry,
          refreshTokenExpiry,
        }));

        dispatch(setLoading(LoadingState.success));
        dispatch(setAuth(
          {
            userId: response.data.authorities.userId,
            authorities: {
              roles: response.data.authorities.authoritiesClear.ROLE as unknown as Roles[],
              permissions: response.data.authorities.authoritiesClear.PERMISSION as unknown as Permissions[],
            }
          }
        ))
        await dispatch(findSelfAsync());
        window.open(DashboardRoutes.dashboard, "_self");
      }
    } catch (error: any) {
      dispatch(setLoading(LoadingState.failed));
      console.log(error);
      dispatch(setErrorMessage(error?.response?.data?.details || 'An unexpected error occurred'))
    }
  };

  const handleGoToForgotPassword = () => {
    navigate(AuthRoutes.forgotPassword);
  };

  return {
    form,
    onSubmit,
    handleGoToForgotPassword,
    loading,
    errorMessage
  };
};
