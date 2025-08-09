import { Button } from "../ui/button";

function Header() {
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
          <Button className="cursor-pointer">Subscribe</Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
