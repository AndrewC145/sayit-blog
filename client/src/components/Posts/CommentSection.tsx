/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useAuth } from "@/context/AuthContext";
import { type UserAuthProps } from "@/context/AuthContext";
import { Ellipsis } from "lucide-react";
import axios, { type AxiosResponse } from "axios";
import Delete from "../Delete";

type CommentType = {
  id: string;
  author: string;
  content: string;
  postId: string;
  createdAt: string;
};

const PORT: string = import.meta.env.VITE_PORT;

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

  const postComment = async (e: React.InputEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    formData.append("author", user?.username || "Anonymous");

    try {
      const response: AxiosResponse = await axios.post(
        `${PORT}/posts/${postId}/comments`,
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
            return (
              <Comment
                setComments={setComments}
                user={user}
                key={comment.id}
                comment={comment}
              />
            );
          })}
      </div>
    </div>
  );
}

function Comment({
  comment,
  user,
  setComments,
}: {
  comment: CommentType;
  user: UserAuthProps | null;
  setComments: React.Dispatch<SetStateAction<CommentType[] | undefined>>;
}) {
  return (
    <div className="mb-6 space-y-6 rounded-lg border border-gray-300 p-4">
      <div className="flex sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <h4 className="font-bold">{comment.author}</h4>
          <h5>{new Date(comment.createdAt).toLocaleDateString()}</h5>
        </div>
        {user?.role === "ADMIN" && (
          <div className="ml-auto">
            <DropDown
              setComments={setComments}
              id={comment.id}
              postId={comment.postId}
              icon={<Ellipsis className="h-4 w-4 cursor-pointer" />}
            />
          </div>
        )}
      </div>
      <p>{comment.content}</p>
    </div>
  );
}

function DropDown({
  icon,
  postId,
  id,
  setComments,
}: {
  icon: React.ReactNode;
  postId?: string;
  id?: string;
  setComments: React.Dispatch<SetStateAction<CommentType[] | undefined>>;
}) {
  const deletePost: () => Promise<void> = async () => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${PORT}/posts/${postId}/comments/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          data: { commentId: id },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setComments((prevComments) =>
          prevComments?.filter((comment) => comment.id !== id),
        );
      }
    } catch (error: any) {
      console.error("Error deleting post", error);
    }
  };

  return <Delete icon={icon} onClick={deletePost} />;
}

export default CommentSection;
