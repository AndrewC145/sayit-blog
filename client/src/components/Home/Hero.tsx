import { Button } from "../ui/button";
import { Link } from "react-router";

function Hero() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-5 bg-gray-950 text-white">
      <div className="flex flex-col items-center gap-8 p-4 sm:p-0">
        <h1 className="font-pt-serif text-center text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl">
          Brand new, and exciting <br /> reads await you
        </h1>
        <Link to="/subscribe">
          <Button
            variant="default"
            className="text-md cursor-pointer bg-red-300 px-8 py-6 text-white hover:bg-red-400"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
