import { INav } from "../types/navTypes";
import { NavLink } from "../ui";

const NavPanel = (props: INav) => {
  const { isOpen, setOpen } = props;
  const navLinks = [
    {
      path: "/profile",
      title: "Мой профиль",
      setOpen: setOpen,
    },
    {
      path: "/",
      title: "Чаты",
      setOpen: setOpen,
    },
  ];
  return (
    <>
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col h-full min-h-[calc(100vh-80px)] bg-black px-3 z-10 max-[700px]:absolute max-[700px]:h-[calc(100vh-80px)] w-full`}
      >
        {navLinks.map((link, index) => (
          <NavLink {...link} key={index} />
        ))}
      </nav>
    </>
  );
};

export default NavPanel;
