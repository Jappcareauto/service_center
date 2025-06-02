import Button from "@/components/button/Button.component";
import Input from "@/components/inputs/Input.component";
import OtpInut from "@/components/inputs/OtpInput.component";
import { useResetPasswordMutation } from "@/redux/api";
import { paths } from "@/routes/paths";
import { ResetPasswordValidationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

type ResetPassword = z.infer<typeof ResetPasswordValidationSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [onResetPassword, { isLoading }] = useResetPasswordMutation();
  const [, setOtp] = useState<string>("");

  useEffect(() => {
    if (!email) {
      navigate(paths.forgotPassword);
      return;
    }
  }, [email, navigate]);

  const form = useForm<ResetPassword>({
    resolver: zodResolver(ResetPasswordValidationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<ResetPassword> = (data) => {
    onResetPassword(data).unwrap();
  };

  const disabled = isLoading || !form.formState.isValid;

  return (
    <main>
      <h1 className="mb-12">Confirm Password Reset</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-6">
          <p>We have sent a reset code to your email</p>
          <OtpInut onChange={(value) => setOtp(value)} />
          <Input
            name="password"
            label="New Password"
            placeholder="Password"
            register={register}
            errorMessage={errors.oldPassword?.message}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Password"
            register={register}
            errorMessage={errors.newPassword?.message}
          />
        </div>
        <Button
          disabled={disabled}
          className="mt-14"
          isLoading={isLoading}
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </main>
  );
};

export default ResetPassword;
