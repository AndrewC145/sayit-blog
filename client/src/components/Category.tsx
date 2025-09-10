/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";
import { type Post } from "./CreatePost";
import axios from "axios";

function Category() {
  const { category } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const PORT: string = import.meta.env.VITE_PORT;

  useEffect(() => {
    const fetchPosts: () => Promise<void> = async () => {
      try {
        const response = await axios.get(`${PORT}/posts/${category}`);
        console.log(response);

        if (response.status === 200) {
          setPosts(response.data.posts);
        }
      } catch (error: any) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();

    return () => {
      setPosts([]);
    };
  }, [PORT, category]);

  if (posts.length === 0) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-screen bg-[rgb(20,20,20)] p-18 text-gray-200">
      <div className="mb-20 flex items-center justify-center">
        <h1 className="font-noto-sans inline-block text-center text-6xl font-semibold">
          {category?.toUpperCase()}
        </h1>
      </div>
      <div>
        {posts.map((post: Post) => (
          <ArticleCard
            key={post.title}
            title={post.title}
            image={post.file}
            topic={post.category}
            mins={post.content.length / 200}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
