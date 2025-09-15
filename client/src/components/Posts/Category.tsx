/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticleCard from "./ArticleCard";
import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import ErrorPage from "../ErrorPage";
import TextLoad from "../TextLoad";
import { type Post } from "../Forms/CreatePost";
import axios from "axios";

function Category() {
  let { category } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const PORT: string = import.meta.env.VITE_PORT;

  let url = `${PORT}/posts/category/${category}`;

  if (category === "all") {
    category = "";
    url = `${PORT}/posts`;
  }

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchPosts: () => Promise<void> = async () => {
      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          setPosts(response.data.posts);
        }
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setError(true);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      setPosts([]);
    };
  }, [PORT, category, url]);

  if (loading) {
    return <TextLoad text="Loading..." />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (posts.length === 0) {
    return <TextLoad text="No posts found" />;
  }

  return (
    <div className="min-h-screen bg-[rgb(20,20,20)] p-10 text-gray-200 sm:p-12 md:p-18">
      <div className="mb-10 flex items-center justify-center sm:mb-15 md:mb-20">
        <h1 className="font-noto-sans inline-block text-center text-4xl font-semibold sm:text-5xl md:text-6xl">
          {category?.toUpperCase() || "ALL"}
        </h1>
      </div>
      <div className="grid-gap grid grid-cols-1 place-items-center gap-5 sm:gap-7 md:grid-cols-2 md:gap-10 lg:gap-15 xl:grid-cols-3">
        {posts.map((post: Post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <ArticleCard
              id={post.id}
              key={post.id}
              title={post.title}
              image={post.file}
              topic={capitalizeFirstLetter(post.category)}
              mins={Math.floor(post.content.length / 250)}
              setPosts={setPosts}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default Category;
