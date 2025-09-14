import { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard";
import axios, { type AxiosResponse } from "axios";
import { type Post } from "../CreatePost";
import { Link } from "react-router";

function Articles() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const PORT: string = import.meta.env.VITE_PORT;

  const handleFilter: (category: string) => void = (category: string) => {
    if (category === "All") {
      setPosts(allPosts);
    } else {
      const filteredPosts: Post[] = allPosts.filter(
        (post) => post.category === category.toLowerCase(),
      );
      setPosts(filteredPosts);
    }
  };

  const gridColumns = () => {
    if (posts.length === 1) return "grid-cols-1";
    if (posts.length === 2) return "sm:grid-cols-2";
    if (posts.length >= 3) return "sm:grid-cols-2 xl:grid-cols-3";

    return "sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";
  };

  useEffect(() => {
    const fetchArticles: () => Promise<void> = async () => {
      try {
        const response: AxiosResponse = await axios.get(`${PORT}/posts`);

        if (response.status === 200) {
          setPosts(response.data.posts);
          setAllPosts(response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchArticles();

    return () => {
      setPosts([]);
    };
  }, [PORT]);
  return (
    <div className="bg-[rgb(20,20,20)]">
      <div className="mx-auto flex w-[80%] flex-col items-center justify-center pt-15 pb-20">
        <nav className="flex items-center justify-between p-4">
          <ul className="flex text-base text-gray-200 sm:gap-4 md:gap-6 md:text-lg lg:gap-8 lg:text-xl 2xl:text-2xl">
            <Topic onClick={(name) => handleFilter(name)} name="All" />
            <Topic onClick={(name) => handleFilter(name)} name="Music" />
            <Topic onClick={(name) => handleFilter(name)} name="Fashion" />
            <Topic onClick={(name) => handleFilter(name)} name="Tech" />
          </ul>
        </nav>
        <div
          className={`gap-1- mt-10 grid justify-items-center gap-10 ${gridColumns()}`}
        >
          {posts.length > 0 &&
            posts.map((post: Post) => (
              <Link to={`/posts/${post.id}`} key={post.id}>
                <ArticleCard
                  key={post.id}
                  title={post.title}
                  topic={post.category}
                  image={post.file}
                  mins={Math.floor(post.content.length / 250)}
                />
              </Link>
            ))}
        </div>
        {posts.length <= 0 && (
          <div className="mt-20 flex items-center justify-center">
            <p className="text-center text-lg font-bold text-gray-400">
              No articles found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Topic({
  name,
  onClick,
}: {
  name: string;
  onClick: (name: string) => void;
}) {
  return (
    <li
      onClick={() => onClick(name)}
      className="cursor-pointer rounded-2xl px-3 py-1.5 active:bg-gray-600"
    >
      {name}
    </li>
  );
}

export default Articles;
