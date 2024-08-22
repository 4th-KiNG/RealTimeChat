import { Link, useLocation } from "react-router-dom";
import { INavLink } from "../types/navTypes";

const NavLink = (props: INavLink) => {
  const { path, title, setOpen } = props;
  const location = useLocation();
  return (
    <>
      <Link
        to={path}
        className={`text-lg text-center px-2 font-thin py-3 transition-all rounded-xl ${
          location.pathname === path ? "bg-white/20" : "bg-transparent"
        } `}
        onClick={
          document.documentElement.clientWidth <= 700 ? setOpen : () => ""
        }
      >
        {title}
      </Link>
    </>
  );
};

export default NavLink;
