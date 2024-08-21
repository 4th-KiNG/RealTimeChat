import { INav } from "../types/navTypes";

const Burger = (props: INav) => {
  const { isOpen, setOpen } = props;
  return (
    <>
      <div
        className={`hidden max-[700px]:flex flex-col transition-all absolute left-5 gap-2 ${
          isOpen ? "w-burgerMd" : "w-burgerLg"
        }`}
        onClick={setOpen}
      >
        <div
          className={`w-burgerSm h-1 transition-all rounded-sm bg-white origin-left ${
            isOpen ? "rotate-45" : ""
          }`}
        ></div>
        <div
          className={`h-1 transition-all rounded-sm bg-white origin-center ${
            isOpen ? "-translate-x-1 -rotate-45 w-burgerLg" : "w-burgerLg"
          }`}
        ></div>
        <div
          className={`w-burgerSm h-1 transition-all rounded-sm bg-white ml-auto origin-right ${
            isOpen ? "rotate-45" : ""
          }`}
        ></div>
      </div>
    </>
  );
};

export default Burger;
