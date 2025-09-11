import { Card, CardTitle, CardFooter } from "./ui/card";

type ArticleProps = {
  title: string;
  image: string;
  topic: string;
  mins: number;
};

function ArticleCard({ title, image, topic, mins }: ArticleProps) {
  const PORT: string = import.meta.env.VITE_PORT;
  return (
    <Card className="h-90 w-56 gap-5 border-0 bg-[rgb(36,36,36)] p-3.5 py-5 sm:w-3xs md:w-2xs lg:w-sm">
      <img
        src={`${PORT}${image}`}
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

export default ArticleCard;
