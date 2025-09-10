import { Link } from "react-router";

function Footer() {
  const homeLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const articlesLinks = [
    { name: "All", path: "/posts/all" },
    { name: "Music", path: "/posts/music" },
    { name: "Fashion", path: "/posts/fashion" },
    { name: "Tech", path: "/posts/tech" },
  ];

  const adminLinks = [{ name: "Create Post", path: "/admin/create" }];
  const currentYear = new Date().getFullYear();

  return (
    <div className="font-pt-serif space-y-20 bg-gray-950 px-24 py-28 text-gray-300">
      <div>
        <h2 className="mb-2 text-6xl">sayit</h2>
        <p>{currentYear} - AndrewC145</p>
      </div>
      <div className="flex items-center gap-12">
        <FooterLinks title="Home" links={homeLinks} />
        <FooterLinks title="Articles" links={articlesLinks} />
        <FooterLinks title="Admin" links={adminLinks} />
      </div>
    </div>
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
