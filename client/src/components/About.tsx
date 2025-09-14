import { Button } from "./ui/button";
import aboutImg from "../assets/images/unseen-studio-s9CC2SKySJM-unsplash.jpg";
import { Link } from "react-router";

function About() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-950 text-white">
        <div className="flex flex-col items-center p-4 sm:p-0">
          <h1 className="font-pt-serif text-center text-3xl leading-[1.25] sm:text-4xl xl:text-5xl">
            We think that reading blog posts <br /> should be fun for everyone
          </h1>
          <Link to="/posts/category/all">
            <Button
              variant="secondary"
              className="font-noto-sans mt-10 cursor-pointer px-6 py-3 font-semibold"
            >
              Read More
            </Button>
          </Link>
        </div>
      </div>
      <AboutBlog />
      <ImageSection />
      <SubscribeSection />
    </>
  );
}

function AboutBlog() {
  return (
    <div className="flex flex-col items-center gap-16 bg-[rgb(20,20,20)] px-12 py-12 text-gray-400 sm:flex-row sm:px-24 sm:py-16">
      <div className="flex flex-col items-center justify-center self-start sm:w-[50%] sm:flex-row">
        <h2 className="font-pt-serif text-3xl leading-[1.3] text-white sm:text-4xl">
          Blog posts readily available <br /> for all to read
        </h2>
      </div>
      <div className="flex flex-col items-center self-start sm:w-[50%] sm:flex-row">
        <p className="font-noto-sans sm:text-md text-lg">
          At SayIt, we believe that insightful and engaging blog content should
          be accessible to everyone. Our platform is dedicated to curating
          articles across a variety of interests, making it easy for readers to
          discover new ideas, stay informed, and enjoy quality writing.
          <br /> <br />
          Whether you're passionate about music, fashion, technology, or just
          looking for something new to read, SayIt is your go-to destination for
          thoughtful and enjoyable blog posts.
          <br /> <br />
          Join us in exploring a world of ideas and stories that inspire,
          entertain, and inform.
        </p>
      </div>
    </div>
  );
}

function ImageSection() {
  return (
    <div className="flex items-center justify-center bg-[rgb(20,20,20)] px-8 py-4 sm:px-20 sm:py-12">
      <div className="aspect-video w-full">
        <img
          src={aboutImg}
          alt="About SayIt"
          className="h-[90%] w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
}

function SubscribeSection() {
  return (
    <div className="font-pt-serif flex flex-col items-center justify-center space-y-8 bg-[rgb(20,20,20)] px-6 py-20 text-white">
      <h3 className="text-center text-3xl leading-[1.2] sm:text-4xl lg:text-5xl xl:text-6xl">
        Uncover thrilling articles <br /> to read
      </h3>
      <p className="text-md font-noto-sans text-center">
        Have fun, experience new ideas, explore opportunities <br /> and broaden
        your horizons.
      </p>
      <Link to="/subscribe">
        <Button variant="secondary" className="font-noto-sans cursor-pointer">
          Subscribe
        </Button>
      </Link>
    </div>
  );
}
export default About;
