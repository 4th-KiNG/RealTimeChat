import { ReactNode, useState } from "react";
import { Header, NavPanel } from ".";

const Layout = ({ children }: { children: Readonly<ReactNode> }) => {
  const [isOpen, setOpen] = useState(true);
  return (
    <>
      <div className="flex flex-col min-h-screen h-full relative z-10 bg-black/80">
        <Header isOpen={isOpen} setOpen={() => setOpen(!isOpen)} />
        <div className="grid grid-cols-layout h-full max-[700px]:grid-cols-1">
          <NavPanel isOpen={isOpen} setOpen={() => setOpen(!isOpen)} />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
