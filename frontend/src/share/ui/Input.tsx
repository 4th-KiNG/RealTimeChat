import { Input as UIInput } from "@nextui-org/react";
import { IInput } from "../types/inputTypes";

const Input = (props: IInput) => {
  const { type, label, register, name, required, requireMessage, pattern } =
    props;
  return (
    <>
      <UIInput
        type={type}
        label={label}
        {...register(name, {
          required: { value: required, message: requireMessage },
          minLength: { value: 4, message: "Минимальная длина поля 4 символа" },
          maxLength: {
            value: 20,
            message: "Максимальная длина поля 20 символов",
          },
          pattern: pattern,
        })}
        className="dark"
        size="lg"
      />
    </>
  );
};

export default Input;
