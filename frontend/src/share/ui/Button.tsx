import { Button as UIButton } from "@nextui-org/react";
import { IButton } from "../types/buttonTypes";

const Button = (props: IButton) => {
  const { label, onClick, isDisabled = false } = props;
  return (
    <>
      <UIButton
        size="lg"
        className="dark w-full"
        disabled={isDisabled}
        onClick={onClick}
      >
        <p className="text-lg font-thin">
          {isDisabled ? "Загрузка..." : label}
        </p>
      </UIButton>
    </>
  );
};

export default Button;
