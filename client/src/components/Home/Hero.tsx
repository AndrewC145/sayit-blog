import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center space-y-5 bg-gray-950 text-white">
      <div className="flex flex-col items-center gap-8">
        <h1 className="font-pt-serif text-center text-6xl">
          Brand new, and exciting <br /> reads await you
        </h1>
        <Button
          variant="default"
          className="text-md cursor-pointer bg-red-300 px-8 py-6 text-white hover:bg-red-400"
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default Hero;
