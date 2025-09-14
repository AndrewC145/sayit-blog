import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";

function Footer() {
  const { user } = useAuth();

  const homeLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const articlesLinks = [
    { name: "All", path: "/posts/category/all" },
    { name: "Music", path: "/posts/category/music" },
    { name: "Fashion", path: "/posts/category/fashion" },
    { name: "Tech", path: "/posts/category/tech" },
  ];

  const adminLinks = [{ name: "Create Post", path: "/admin/create" }];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-pt-serif flex flex-col space-y-20 bg-gray-950 px-12 py-14 text-gray-300 md:px-24 md:py-28">
      <div>
        <h2 className="mb-2 text-6xl">sayit</h2>
        <p>{currentYear} - AndrewC145</p>
      </div>
      <div className="flex flex-col items-center gap-12 sm:flex-row">
        <FooterLinks title="Home" links={homeLinks} />
        <FooterLinks title="Articles" links={articlesLinks} />
        {user && user.role === "ADMIN" && (
          <FooterLinks title="Admin" links={adminLinks} />
        )}
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { name: string; path: string }[];
}) {
  return (
    <div className="w-full space-y-4 self-start">
      <h3 className="text-2xl">{title}</h3>
      <ul className="inline-flex list-none flex-col gap-3">
        {links.map((link) => (
          <Link
            className="cursor-pointer text-gray-300 hover:underline"
            to={link.path}
            key={link.name}
          >
            <li key={link.name} className="list-none text-sm">
              {link.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
