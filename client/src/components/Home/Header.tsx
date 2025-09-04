/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { AuthContext, type AuthContextType } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Link, useNavigate, type NavigateFunction } from "react-router";
import axios from "axios";

const PORT = import.meta.env.VITE_PORT;

function Header() {
  const { token, setToken } = useContext<AuthContextType>(AuthContext);
  const navigate: NavigateFunction = useNavigate();
  return (
    <header className="bg-[#242424] text-white">
      <nav className="font-noto-sans flex items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="sm:text-md flex-1 text-base font-semibold lg:text-xl">
          sayit
        </h1>
        <ul className="flex gap-4 md:gap-5 lg:gap-7">
          <li className="cursor-pointer">All</li>
          <li className="cursor-pointer">Music</li>
          <li className="cursor-pointer">Fashion</li>
          <li className="cursor-pointer">Tech</li>
        </ul>
        <div className="flex flex-1 justify-end space-x-3">
          {token ? (
            LogoutButton({ setToken, navigate })
          ) : (
            <Link to="/subscribe">
              <Button className="cursor-pointer">Subscribe</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

function LogoutButton({
  setToken,
  navigate,
}: {
  setToken: AuthContextType["setToken"];
  navigate: NavigateFunction;
}) {
  const logoutUser = async () => {
    try {
      const response = await axios.post(
        `${PORT}/users/logout`,
        {},
        { withCredentials: true },
      );

      if (response.status === 200) {
        setToken(null);
        navigate("/subscribe");
      }
    } catch (error: any) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <Button onClick={logoutUser} className="cursor-pointer">
      Logout
    </Button>
  );
}

export default Header;
