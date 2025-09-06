import { Button } from "./ui/button";
import { Link } from "react-router";

function ErrorPage() {
  return (
    <div className="font-pt-serif flex h-screen items-center justify-center bg-gray-950 text-white">
      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
          404 Page Not Found
        </h1>
        <h1>
          The page you are looking for either does not exist or you do not have
          the correct permissions
        </h1>
        <Link to="/">
          <Button className="cursor-pointer transition-colors duration-400 hover:bg-white hover:text-black">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
