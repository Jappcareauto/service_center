import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import PrimaryButton from '@/shared/generics/buttons/PrimaryButton';
import InputPasseord from '@/shared/generics/inputs/InputPasseord';
import UnAuthenticatePageLayout from '@/shared/generics/layouts/UnAuthenticatePageLayout';
import Loader from '@/shared/generics/loader/Loader';
import httpClient from '@/services/api-client';
import { AuthRoutes } from "../../infra/routes/Router";
import InputOtp from '@/shared/generics/inputs/InputOtp'

const ConfirmPasswordSchemaValidation = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ConfirmPasswordForm = z.infer<typeof ConfirmPasswordSchemaValidation>;

const FogotPasswordConfirmView = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate(AuthRoutes.forgotPassword);
    }
  }, [email, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<ConfirmPasswordForm>({
    resolver: zodResolver(ConfirmPasswordSchemaValidation),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');

  const onSubmit: SubmitHandler<ConfirmPasswordForm> = async (data) => {
    setLoading(true);
    setError('');
    try {
      await httpClient.post('/auth/reset-password', { email:email, newPassword: data.password, code: otp });
      navigate(AuthRoutes.login);
    } catch (error: any) {
      console.log(error)
      setError(error?.response?.data?.details || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UnAuthenticatePageLayout>
      <h1 className="mb-12">Confirm Password Reset</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-y-6'>
        <p>We have sent a reset code to your email</p>
          <InputOtp onChange={(value) => setOtp(value)} />
          <InputPasseord
            name="password"
            label="New Password"
            placeholder="Password"
            register={register}
            errorMessage={errors.password?.message}
          />
          <InputPasseord
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Password"
            register={register}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
        <div className="mt-2">
          {error && <p className="text-primary">{error}</p>}
          {loading ? <Loader /> : (
            <PrimaryButton type="submit" className="mt-4">
              Submit
            </PrimaryButton>
          )}
        </div>
      </form>
    </UnAuthenticatePageLayout>
  );
};

export default FogotPasswordConfirmView;
