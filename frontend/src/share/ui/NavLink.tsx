import { Link, useLocation } from "react-router-dom";
import { INavLink } from "../types/navTypes";

const NavLink = (props: INavLink) => {
  const { path, title, setOpen } = props;
  const location = useLocation();
  return (
    <>
      <Link
        to={path}
        className={`text-lg font-bold text-center px-2 py-3 rounded-xl ${
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
