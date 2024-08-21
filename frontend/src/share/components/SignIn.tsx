import { Button, ErrorMessage, Input } from "../ui";
import { IAuth } from "../types/authTypes";
import { useForm } from "react-hook-form";
import { IFormValues } from "../types/inputTypes";
import { useAuth } from "../../lib/hooks/useAuth";
import { emailPattern } from "../../lib/utils/consts";

const SignIn = (props: IAuth) => {
  const { onClick } = props;

  const { SignInData, SignInErrors } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit = (data: IFormValues) => {
    SignInData(data);
  };

  return (
    <>
      <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
        <h1 className="text-center text-3xl font-thin">Вход</h1>
        <form action="" className="flex flex-col gap-3 w-full">
          <Input
            type="email"
            label="Email"
            name="email"
            register={register}
            requireMessage="Почта является обязательным полем"
            pattern={emailPattern}
            required
          />
          {errors.email?.message && (
            <ErrorMessage message={errors.email.message} />
          )}
          <Input
            type="password"
            label="Пароль"
            name="password"
            register={register}
            requireMessage="Пароль является обязательным полем"
            required
          />
          {errors.password?.message && (
            <ErrorMessage message={errors.password.message} />
          )}
          <Button label="Войти" onClick={handleSubmit(onSubmit)} />
        </form>
        {SignInErrors && <ErrorMessage message="Не удалось войти" />}
        <div className="flex justify-between w-full max-w-">
          <p className="text-white/70">Нет аккаунта?</p>
          <p className="text-blue-400 cursor-pointer" onClick={onClick}>
            Зарегистирироваться
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
