/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Link, useNavigate, type NavigateFunction } from "react-router";

function Header() {
  const { token, handleLogout } = useAuth();

  const headerLinks: object[] = [
    {
      name: "All",
      link: "/posts/all",
    },
    {
      name: "Music",
      link: "/posts/music",
    },
    {
      name: "Fashion",
      link: "/posts/fashion",
    },
    {
      name: "Tech",
      link: "/posts/tech",
    },
  ];
  return (
    <header className="bg-[#242424] text-white">
      <nav className="font-noto-sans flex items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="sm:text-md flex-1 text-base font-semibold lg:text-xl">
          <Link to="/">sayit</Link>
        </h1>
        <ul className="flex gap-4 md:gap-5 lg:gap-7">
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
              <Button className="cursor-pointer">Subscribe</Button>
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
    <Button onClick={() => handleLogout(navigate)} className="cursor-pointer">
      Logout
    </Button>
  );
}

export default Header;
