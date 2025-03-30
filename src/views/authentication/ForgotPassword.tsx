import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/services/api-client";
import { useAppDispatch } from "@/hooks/hooks";
import { setSuccessMessage, setErrorMessage, clearAllMessages } from "@/redux/messagesSlice";
import { useEffect } from "react";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormInputs = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Clear messages on component mount
  useEffect(() => {
    dispatch(clearAllMessages());
  }, [dispatch]);

  const { mutate: submitForgotPassword, isPending } = useMutation({
    mutationFn: (email: string) => 
      apiClient.post("/auth/forgot-password", { email }),
    onSuccess: (_, variables) => {
      dispatch(setSuccessMessage("Password reset link sent to your email"));
      navigate("/forgot-password-confirm?email=" + variables);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to send reset link. Please try again.";
      dispatch(setErrorMessage(errorMessage));
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = (data) => {
    submitForgotPassword(data.email);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;