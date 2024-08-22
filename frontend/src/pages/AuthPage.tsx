import { useState } from "react";
import { SignIn, SignUp } from "../share/components";

const AuthPage = () => {
  const [status, setStatus] = useState<"signup" | "signin">("signup");
  return (
    <>
      <div className="relative bg-black/80 z-10 min-h-screen">
        <div
          className={`relative min-h-screen ${
            document.documentElement.clientWidth <= 700 ? "w-full" : "w-1/2"
          } ${
            status === "signin" || document.documentElement.clientWidth <= 700
              ? ""
              : "translate-x-full"
          } bg-black p-3 flex flex-col transition duration-300 items-center justify-center`}
        >
          {status === "signup" && (
            <SignUp onClick={() => setStatus("signin")} />
          )}
          {status === "signin" && (
            <SignIn onClick={() => setStatus("signup")} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
