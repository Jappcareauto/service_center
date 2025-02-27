import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import Input from "@/shared/generics/inputs/Input";
import InputPasseord from "@/shared/generics/inputs/InputPasseord";
import UnAuthenticatePageLayout from "@/shared/generics/layouts/UnAuthenticatePageLayout";
import Loader from "@/shared/generics/loader/Loader";
import { useLogin } from "./useLogin";
import { LoadingState } from "@/shared/enums/LoadingState";

const LoginView = () => {
  const { form, onSubmit, handleGoToForgotPassword, loading } = useLogin();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <UnAuthenticatePageLayout>
      <h1 className="mb-12">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex flex-col gap-y-6">
          <Input
            name="email"
            label="Email"
            placeholder="Email"
            register={register}
            errorMessage={errors.email?.message}
          />
          <InputPasseord
            name="password"
            label="Password"
            placeholder="Password"
            register={register}
            errorMessage={errors.password?.message}
          />
        </div>
        <div className="flex justify-end w-full">
          <button onClick={handleGoToForgotPassword} className="text-primary">
            Forgot Password?
          </button>
        </div>
        
          {loading === LoadingState.failed && <p className="my-2 text-primary">failed to login</p>}
        
        <PrimaryButton
          disabled={loading === LoadingState.pending}
          className="w-full mt-14 flex items-center justify-center"
        >
          {loading === LoadingState.pending ? <Loader /> : "Sign In"}
        </PrimaryButton>
      </form>
    </UnAuthenticatePageLayout>
  );
};

export default LoginView;
