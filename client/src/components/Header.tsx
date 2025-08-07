import { Button } from "./ui/button";

function Header() {
  return (
    <header className="bg-gray-200">
      <nav className="font-noto-sans flex items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="sm:text-md text-base font-semibold lg:text-xl">sayit</h1>
        <ul className="flex gap-4 md:gap-5 lg:gap-7">
          <li>All</li>
          <li>Music</li>
          <li>Fashion</li>
          <li>Tech</li>
        </ul>
        <div className="space-x-3">
          <Button>Subscribe</Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
