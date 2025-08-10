import { Button } from "./ui/button";
import aboutImg from "../assets/images/unseen-studio-s9CC2SKySJM-unsplash.jpg";

function About() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-950 text-white">
        <div className="flex flex-col items-center">
          <h1 className="font-pt-serif text-center text-5xl leading-[1.25]">
            We think that reading blog posts <br /> should be fun for everyone
          </h1>
          <Button
            variant="secondary"
            className="font-noto-sans mt-10 cursor-pointer px-6 py-3 font-semibold"
          >
            Read More
          </Button>
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
    <div className="flex items-center gap-16 bg-[rgb(20,20,20)] px-24 py-16 text-gray-400">
      <div className="flex w-[50%] items-center justify-center self-start">
        <h2 className="font-pt-serif text-4xl leading-[1.3] text-white">
          Blog posts readily available <br /> for all to read
        </h2>
      </div>
      <div className="flex w-[50%] items-center self-start">
        <p className="font-noto-sans text-lg">
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
    <div className="flex items-center justify-center bg-[rgb(20,20,20)] px-20 py-12">
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
    <div className="font-pt-serif flex flex-col items-center justify-center space-y-8 bg-[rgb(20,20,20)] py-20 text-white">
      <h3 className="text-center text-6xl leading-[1.2]">
        Uncover thrilling articles <br /> to read
      </h3>
      <p className="text-md font-noto-sans text-center">
        Have fun, experience new ideas, explore opportunities <br /> and broaden
        your horizons.
      </p>
      <Button variant="secondary" className="font-noto-sans cursor-pointer">
        Subscribe
      </Button>
    </div>
  );
}
export default About;
