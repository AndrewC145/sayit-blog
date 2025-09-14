import { Card, CardTitle, CardFooter } from "./ui/card";
import Delete from "./Delete";
import { Ellipsis } from "lucide-react";
import { type Post } from "./CreatePost";
import axios, { type AxiosResponse } from "axios";
import { useAuth } from "@/context/AuthContext";

type ArticleProps = {
  title: string;
  image: string;
  topic: string;
  mins: number;
  id?: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

function ArticleCard({
  title,
  image,
  topic,
  mins,
  id,
  setPosts,
}: ArticleProps) {
  const { user } = useAuth();
  const PORT: string = import.meta.env.VITE_PORT;
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const response: AxiosResponse = await axios.delete(`${PORT}/posts/${id}`, {
      headers: { "Content-Type": "application/json" },
      data: { id },
      withCredentials: true,
    });

    if (response.status === 200) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  return (
    <Card className="h-90 w-56 gap-5 border-0 bg-[rgb(36,36,36)] p-3.5 py-5 sm:w-2xs md:w-2xs lg:w-sm">
      <img
        src={`${PORT}${image}`}
        alt={title}
        className="size-full rounded-md object-cover"
      />
      <CardTitle className="font-pt-serif text-md flex items-center font-light text-white sm:text-lg lg:text-2xl">
        {title}
        {user?.role === "ADMIN" && (
          <div className="ml-auto flex items-center">
            <Delete onClick={handleDelete} icon={<Ellipsis />} />
          </div>
        )}
      </CardTitle>
      <CardFooter className="flex items-center gap-4 p-0">
        <span className="text-sm text-gray-400">{topic}</span>
        <span className="text-sm text-gray-400">{mins} min</span>
      </CardFooter>
    </Card>
  );
}

export default ArticleCard;
