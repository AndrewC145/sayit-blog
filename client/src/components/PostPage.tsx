/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { type Post } from "./CreatePost";
import TextLoad from "./TextLoad";
import ErrorPage from "./ErrorPage";
import CommentSection from "./CommentSection";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const PORT: string = import.meta.env.VITE_PORT;

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchPost: () => Promise<void> = async () => {
      try {
        const response = await axios.get(`${PORT}/posts/${id}`);

        if (response.status === 200) {
          setPost(response.data.post);
        }
      } catch (error: any) {
        console.error("Error fetching post:", error);
        setError(true);
        setPost(undefined);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();

    return () => {
      setPost(undefined);
    };
  }, [PORT, id]);

  if (loading) return <TextLoad text="Loading..." />;

  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-[rgb(20,20,20)] p-18 text-gray-200">
      {post ? (
        <div className="font-pt-serif mx-auto flex max-w-3xl flex-col gap-10">
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <img src={`${PORT}${post.file}`}></img>
            <h2 className="text-lg">
              {Math.floor(post.content.length / 250)} min read
            </h2>
          </div>
          <p>{post.content}</p>
          <CommentSection postId={id} comments={post.comments} />
        </div>
      ) : (
        <TextLoad text="No post found with this ID" />
      )}
    </div>
  );
}

export default PostPage;
