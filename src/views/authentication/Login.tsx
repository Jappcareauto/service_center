import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/services/api-client";
import { setSuccessMessage, setErrorMessage, clearAllMessages } from "@/redux/messagesSlice";
import { login as userLogin } from "@/redux/authSlice";
import { setCurrentServiceCenter, setServiceCenters } from "@/redux/serviceCenterSlice";
import { IUser, IServiceCenter } from "@/types";

export const InputLoginSchemaValidation = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().nonempty("Password is required"),
});

const LoginView = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // Clear all messages on component mount
  useEffect(() => {
    console.log(isAuthenticated)
    console.log(user)
    dispatch(clearAllMessages());
    if (isAuthenticated && user) {
      navigate("/dashboard");
    }
  }, [dispatch])

  // React Query mutation for login
  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => 
      apiClient.post("/auth/login", credentials),
    onSuccess: async (response) => {
      const { data } = response.data;

      // Check if the user has the ROLE_SERVICE_MANAGER role
      // const roles = data.authorities.authoritiesClear.ROLE;
      // const hasServiceManagerRole = roles.includes('ROLE_SERVICE_MANAGER');

      // if (hasServiceManagerRole) {
      //   dispatch(setErrorMessage("You are not authorized to access this. "));
      //   return;
      // }
      
      console.log(data)

      localStorage.setItem("AUTH_ACCESS", JSON.stringify({
        accessToken: data.accessToken,
        accessTokenExpiry: data.accessTokenExpiry,
        refreshToken: data.refreshToken,
        refreshTokenExpiry: data.refreshTokenExpiry,
      }));

      const userId = data.authorities.userId;  

      // Get user profile
      const userResponse = await apiClient.get("/user/logged-in");
      dispatch(userLogin(userResponse.data.data as IUser));
    
      // Get service center
      const serviceCenterResponse = await apiClient.post(`/service-center/list?ownerId=${userId}`,{});
      dispatch(setServiceCenters(serviceCenterResponse.data.data as IServiceCenter[]));
      // set the first service center as current. when flow for choosing is available, it can be updated
      dispatch(setCurrentServiceCenter(serviceCenterResponse.data.data[0] as IServiceCenter));
      
      // Redirect to dashboard or home page
      navigate("/dashboard");
      
      dispatch(setSuccessMessage('Login successfull'))
    },
    onError: (error: any) => {
      console.log(error)
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      dispatch(setErrorMessage(errorMessage))
    }
  });

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(InputLoginSchemaValidation),
  });

  // Form submission
  const onSubmit: SubmitHandler<any> = (data) => {
    login({ email: data.email, password: data.password });
  };

  const handleGoToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-12">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Email"
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Password"
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGoToForgotPassword}
              className="text-sm font-medium text-primary hover:text-primary-dark cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            {isPending ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;