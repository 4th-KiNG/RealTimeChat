import { ISelect } from "../types/inputTypes";
import { SelectItem, Select as UISelect } from "@nextui-org/react";

const Select = (props: ISelect) => {
  const { label, variants, register, name, required, requireMessage } = props;
  return (
    <>
      <UISelect
        label={label}
        {...register(name, {
          required: { value: required, message: requireMessage },
        })}
      >
        {variants.map((variant, index) => (
          <SelectItem key={index} value={`${variant === "Приватный"}`}>
            {variant}
          </SelectItem>
        ))}
      </UISelect>
    </>
  );
};

export default Select;
