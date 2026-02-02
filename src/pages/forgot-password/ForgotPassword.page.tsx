import Button from "@/components/button/Button.component";
import CustomInput from "@/components/inputs/Input.component";
import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/enums";
import { useForgotPasswordMutation } from "@/redux/api";
import { ForgotPasswordValidationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [onForgotPassword, { isLoading }] = useForgotPasswordMutation();
  type ForgotPasswordInput = z.infer<typeof ForgotPasswordValidationSchema>;
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordValidationSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<ForgotPasswordInput> = (data) => {
    onForgotPassword(data)
      .unwrap()
      .then((res) => {
        toast(ToastType.SUCCESS, res?.data?.message as string);
      })
      .catch((err) => {
        if (err?.data?.error) {
          toast(ToastType.ERROR, err?.data?.error);
        }
        const validationErrors = err?.data?.errors;
        if (validationErrors) {
          Object.values(validationErrors).forEach((errorMessage) => {
            toast(ToastType.ERROR, errorMessage as string);
          });
        } else if (err?.data?.message || err?.message) {
          toast(ToastType.ERROR, err?.data?.message || err?.message);
        } else if (err?.error?.error) {
          toast(ToastType.ERROR, err?.error?.error);
        }
      });
  };
  const disabled = isLoading || !form.formState.isValid;

  return (
    <main>
      <h1 className="mb-12">Forgot password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          name="email"
          label="Email"
          placeholder="Email"
          register={register}
          errorMessage={errors.email?.message}
        />
        <Button
          disabled={disabled}
          className="mt-14"
          isLoading={isLoading}
          type="submit"
        >
          Request link
        </Button>
      </form>
    </main>
  );
};

export default ForgotPassword;
