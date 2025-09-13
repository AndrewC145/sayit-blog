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
      setPosts(allPosts.slice(0, 4)); // Set a limit to 4 posts
    } else {
      const filteredPosts: Post[] = posts.filter(
        (post) => post.category === category,
      );
      setPosts(filteredPosts.slice(0, 4)); // Set a limit to 4 posts
    }
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
      <div className="mx-auto w-[60%] pt-15 pb-20">
        <nav className="flex items-center justify-between p-4">
          <ul className="flex gap-8 text-lg text-gray-200">
            <Topic onClick={(name) => handleFilter(name)} name="All" />
            <Topic onClick={(name) => handleFilter(name)} name="Music" />
            <Topic onClick={(name) => handleFilter(name)} name="Fashion" />
            <Topic onClick={(name) => handleFilter(name)} name="Tech" />
          </ul>
        </nav>
        {posts.length > 0 ? (
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
          ))
        ) : (
          <div className="mt-20 flex items-center justify-center">
            <p className="inline-block text-center text-lg font-bold text-gray-400">
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
