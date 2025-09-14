/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useAuth } from "@/context/AuthContext";
import axios, { type AxiosResponse } from "axios";

type CommentType = {
  id: string;
  author: string;
  content: string;
  postId: string;
  createdAt: string;
};

function CommentSection({
  postId,
  comments: initialComments,
}: {
  postId: string | undefined;
  comments?: CommentType[];
}) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentType[] | undefined>(
    initialComments,
  );
  const [error, setError] = useState<string | null>(null);
  const PORT: string = import.meta.env.VITE_PORT;

  const postComment = async (e: React.InputEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    formData.append("author", user?.username || "Anonymous");

    try {
      const response: AxiosResponse = await axios.post(
        `${PORT}/posts/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        setComments((prevComment) => [
          response.data.newComment,
          ...(prevComment || []),
        ]);
        setError(null);
      }
    } catch (error: any) {
      console.error("Error posting comment", error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl">Comments</h3>
      <form onSubmit={postComment} className="mb-12 flex flex-col">
        <Label className="sr-only" htmlFor="comment">
          Add a comment
        </Label>
        <Textarea
          className="min-h-[100px] bg-[rgb(30,30,30)] text-xs text-gray-200 placeholder:text-gray-500 sm:text-sm md:text-base"
          id="comment"
          name="comment"
          placeholder="Type your comment here"
        />
        <Button
          type="submit"
          className="mt-4 mr-auto cursor-pointer bg-white text-black hover:bg-gray-200"
        >
          Submit
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <div className="flex flex-col">
        {comments &&
          comments?.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
      </div>
    </div>
  );
}

function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="mb-6 space-y-6 rounded-lg border border-gray-300 p-4">
      <div className="flex flex-col sm:flex-row sm:gap-4">
        <h4 className="font-bold">{comment.author}</h4>
        <h5>{new Date(comment.createdAt).toLocaleDateString()}</h5>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}

export default CommentSection;
