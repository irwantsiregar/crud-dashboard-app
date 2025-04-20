import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ToasterContext } from "@/contexts/ToasterContext";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your email or username"),
  password: yup.string().required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();

  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const callbackUrl: string =
    (router.query.callbackUrl as string) || "/admin/dashboard";

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result?.status === 401) {
      throw new Error("Email or username not match with password");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "Your credentials is wrong",
      });
    },
    onSuccess: () => {
      reset();

      setToaster({
        type: "success",
        message: "Login Success",
      });

      router.push(callbackUrl);
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
