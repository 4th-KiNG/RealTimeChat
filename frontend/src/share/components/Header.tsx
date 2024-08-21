import { web } from "../../assets/images";
import { INav } from "../types/navTypes";
import Burger from "./Burger";

const Header = (props: INav) => {
  return (
    <>
      <header className="relative flex items-center gap-3 justify-center py-6 bg-black">
        <Burger {...props} />
        <img src={web} alt="" />
        <h1 className="text-2xl font-bold">RealTime Chat</h1>
      </header>
    </>
  );
};

export default Header;
