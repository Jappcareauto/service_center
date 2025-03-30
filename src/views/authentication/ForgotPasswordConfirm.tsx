import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/services/api-client";
import { useAppDispatch } from "@/hooks/hooks";
import { setSuccessMessage, setErrorMessage, clearAllMessages } from "@/redux/messagesSlice";
import { useEffect } from "react";
import InputOtp from "@/components/inputs/inputOtp";

const ForgotPasswordConfirmSchema = z.object({
  code: z.string().min(6, "OTP must be 6 characters").max(6),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ForgotPasswordConfirmInputs = z.infer<typeof ForgotPasswordConfirmSchema>;

const ForgotPasswordConfirm = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  // Clear messages on component mount
  useEffect(() => {
    dispatch(clearAllMessages());
  }, [dispatch]);

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (data: { email: string; newPassword: string; code: string }) => 
      apiClient.post("/auth/reset-password", data),
    onSuccess: () => {
      dispatch(setSuccessMessage("Password reset successfully!"));
      navigate("/login");
    },
    onError: (error: any) => {
        console.log(error)
      const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
      dispatch(setErrorMessage(errorMessage));
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordConfirmInputs>({
    resolver: zodResolver(ForgotPasswordConfirmSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordConfirmInputs> = (data) => {
    if (!email) {
      dispatch(setErrorMessage("Email is required"));
      return;
    }
    resetPassword({
      email,
      newPassword: data.newPassword,
      code: data.code
    });
  };

  const handleOtpChange = (value: string) => {
    setValue("code", value, { shouldValidate: true });
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
      <p className="text-gray-600">Please enter the code sent to {email}</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <InputOtp onChange={handleOtpChange} />
          {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>}
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            {...register("newPassword")}
            placeholder="New Password"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
        >
          {isPending ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordConfirm;