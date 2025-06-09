import Button from "@/components/button/Button.component";
import Input from "@/components/inputs/Input.component";
import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/enums";
import { useLoginUserMutation } from "@/redux/api";
import {
  setAccessToken,
  setRefreshToken,
  setUserInfo,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { paths } from "@/routes/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { LoginValidationSchema } from "../../schemas";
import { useEffect } from "react";

const Login = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  type LoginInput = z.infer<typeof LoginValidationSchema>;
  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginValidationSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (accessToken) {
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      navigate(redirect || paths.dashboard, { replace: true });
    }
  }, [accessToken]);

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    loginUser(data)
      .unwrap()
      .then((res) => {
        dispatch(setUserInfo(res?.data?.authorities));
        dispatch(setAccessToken(res.data.accessToken));
        dispatch(setRefreshToken(res.data.refreshToken));
        toast(ToastType.SUCCESS, "Logged in");
        navigate(paths.dashboard);
      })
      .catch((err) => {
        if (err?.data?.errors) {
          toast(ToastType.ERROR, err?.data?.errors);
        }
      });
  };

  // fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data[1].title))
  //   .catch((error) => console.error("Error fetching data:", error));

  const disabled = isLoading || !form.formState.isValid;
  return (
    <main>
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
          <Input
            name="password"
            label="Password"
            placeholder="Password"
            register={register}
            errorMessage={errors.password?.message}
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            onClick={() => navigate(paths.forgotPassword)}
            className="text-primary"
          >
            Forgot Password?
          </button>
        </div>
        <Button
          disabled={disabled}
          className="mt-14 w-full"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>
    </main>
  );
};

export default Login;
