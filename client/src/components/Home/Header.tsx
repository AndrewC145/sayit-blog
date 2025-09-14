/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Link, useNavigate, type NavigateFunction } from "react-router";

function Header() {
  const { token, handleLogout } = useAuth();

  const headerLinks: object[] = [
    {
      name: "All",
      link: "/posts/category/all",
    },
    {
      name: "Music",
      link: "/posts/category/music",
    },
    {
      name: "Fashion",
      link: "/posts/category/fashion",
    },
    {
      name: "Tech",
      link: "/posts/category/tech",
    },
  ];
  return (
    <header className="bg-[#242424] text-white">
      <nav className="font-noto-sans flex items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="sm:text-md flex-1 text-xs font-semibold lg:text-lg xl:text-xl">
          <Link to="/">sayit</Link>
        </h1>
        <ul className="flex gap-4 text-xs sm:text-base md:gap-5 lg:gap-7">
          {headerLinks.map((item: any, index: number) => (
            <li className="cursor-pointer hover:underline" key={index}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-1 justify-end space-x-3">
          {token ? (
            <LogoutButton handleLogout={handleLogout} />
          ) : (
            <Link to="/subscribe">
              <Button className="ml-3 cursor-pointer p-1.5 text-xs sm:ml-0 md:p-5 md:text-base">
                Subscribe
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

function LogoutButton({
  handleLogout,
}: {
  handleLogout: (navigate: NavigateFunction) => void;
}) {
  const navigate: NavigateFunction = useNavigate();
  return (
    <Button
      onClick={() => handleLogout(navigate)}
      className="ml-3 cursor-pointer p-1.5 text-xs sm:ml-0 md:p-5 md:text-base"
    >
      Logout
    </Button>
  );
}

export default Header;
