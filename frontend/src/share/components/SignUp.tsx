import { IAuth } from "../types/authTypes";
import { Button, ErrorMessage, Input } from "../ui";
import { useForm } from "react-hook-form";
import { IFormValues } from "../types/inputTypes";
import { emailPattern } from "../../lib/utils/consts";
import { useAuth } from "../../lib/hooks/useAuth";

const SignUp = (props: IAuth) => {
  const { onClick } = props;

  const { SignUpData, SignUpErrors } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit = (data: IFormValues) => {
    SignUpData(data);
  };

  return (
    <>
      <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
        <h1 className="text-center text-3xl font-thin">Регистрация</h1>
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
            type="name"
            label="Имя"
            name="name"
            register={register}
            requireMessage="Имя является обязательным полем"
            required
          />
          {errors.name?.message && (
            <ErrorMessage message={errors.name.message} />
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
          <Button
            label="Зарегистирироваться"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
        {SignUpErrors && (
          <ErrorMessage message="Пользователь с таким email уже существует" />
        )}
        <div className="flex justify-between w-full max-w-">
          <p className="text-white/70">Есть аккаунт?</p>
          <p className="text-blue-400 cursor-pointer" onClick={onClick}>
            Войти
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
