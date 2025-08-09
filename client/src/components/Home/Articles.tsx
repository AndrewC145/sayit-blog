import { Card, CardTitle, CardFooter } from "../ui/card";
import testImg from "../../images/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_août_2014_(2).jpg";

type ArticleProps = {
  title: string;
  image: string;
  topic: string;
  mins: number;
};

function Articles() {
  return (
    <div className="bg-[rgb(20,20,20)]">
      <div className="mx-auto w-[60%] pt-15 pb-20">
        <nav className="flex items-center justify-between p-4">
          <ul className="flex gap-8 text-lg text-gray-200">
            <Topic name="All" />
            <Topic name="Music" />
            <Topic name="Fashion" />
            <Topic name="Tech" />
          </ul>
        </nav>
        <ArticleCard
          title="The Rise of AI in Music Production"
          image={testImg}
          topic="Music"
          mins={5}
        />
      </div>
    </div>
  );
}

function Topic({ name }: { name: string }) {
  return (
    <li className="cursor-pointer rounded-2xl px-3 py-1.5 active:bg-gray-600">
      {name}
    </li>
  );
}

function ArticleCard({ title, image, topic, mins }: ArticleProps) {
  return (
    <Card className="w-sm gap-5 border-0 bg-[rgb(36,36,36)] p-3.5 pb-5">
      <img
        src={image}
        alt={title}
        className="size-full rounded-md object-cover"
      />
      <CardTitle className="font-pt-serif text-md font-light text-white sm:text-lg lg:text-2xl">
        {title}
      </CardTitle>
      <CardFooter className="flex items-center gap-4 p-0">
        <span className="text-sm text-gray-400">{topic}</span>
        <span className="text-sm text-gray-400">{mins} min</span>
      </CardFooter>
    </Card>
  );
}

export default Articles;
