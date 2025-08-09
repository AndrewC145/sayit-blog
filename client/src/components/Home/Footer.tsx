function Footer() {
  return (
    <div className="font-pt-serif bg-gray-950 p-16 text-gray-300">
      <div>
        <h2 className="mb-8 text-5xl">sayit</h2>
      </div>
      <div className="flex items-center gap-12">
        <div className="w-full space-y-4 self-start">
          <h3 className="text-2xl">Pages</h3>
          <ul className="inline-block list-none space-y-2">
            <li>Home</li>
            <li>About</li>
          </ul>
        </div>
        <div className="w-full space-y-4 self-start">
          <h3 className="text-2xl">Articles</h3>
          <ul className="inline-block list-none space-y-2">
            <ul>All</ul>
            <li>Music</li>
            <li>Fashion</li>
            <li>Tech</li>
          </ul>
        </div>
        <div className="w-full space-y-4 self-start">
          <h3 className="text-2xl">Admin</h3>
          <ul className="inline-block list-none space-y-2">
            <li>Login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
