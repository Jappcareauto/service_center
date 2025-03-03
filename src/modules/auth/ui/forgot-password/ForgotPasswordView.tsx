import PrimaryButton from '@/shared/generics/buttons/PrimaryButton';
import Input from '@/shared/generics/inputs/Input';
import UnAuthenticatePageLayout from '@/shared/generics/layouts/UnAuthenticatePageLayout';
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "@/shared/generics/loader/Loader";
import httpClient from "@/services/api-client";
import { AuthRoutes } from "../../infra/routes/Router";
import { useNavigate } from "react-router-dom";

const InputForgotPasswordSchemaValidation = z.object({
  email: z.string().email(),
});

type InputForgotPasswordForm = z.infer<typeof InputForgotPasswordSchemaValidation>;

const ForgotPasswordView = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<InputForgotPasswordForm>({
    resolver: zodResolver(InputForgotPasswordSchemaValidation),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<InputForgotPasswordForm> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await httpClient.post('/auth/forgot-password', data);
      const params = new URLSearchParams({ email: data.email });
      navigate(`${AuthRoutes.forgotPasswordConfirm}?${params.toString()}`);
    } catch (error: any) {
      setError(error?.response?.data?.details || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UnAuthenticatePageLayout>
      <h1 className="mb-12">Forgot password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          register={register}
          errorMessage={errors.email?.message}
        />
        <div className="mt-2">
          {error && <p className="text-primary">{error}</p>}
          {loading ? <Loader /> : (
            <PrimaryButton type="submit" className="mt-4">
              Send email
            </PrimaryButton>
          )}
        </div>
      </form>
    </UnAuthenticatePageLayout>
  );
};

export default ForgotPasswordView;