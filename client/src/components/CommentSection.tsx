import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useAuth } from "@/context/AuthContext";

type CommentType = {
  id: string;
  author: string;
  content: string;
  postId: string;
  createdAt: string;
};

function CommentSection({ comments }: { comments?: CommentType[] }) {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <h3 className="text-xl">Comments</h3>
      {user ? (
        <form className="flex flex-col space-y-2">
          <Label className="sr-only" htmlFor="comment">
            Add a comment
          </Label>
          <Textarea
            id="comment"
            name="comment"
            placeholder="Type your comment here"
          />
          <Button className="mt-4 mr-auto cursor-pointer bg-white text-black hover:bg-gray-200">
            Submit
          </Button>
        </form>
      ) : (
        <div>
          <p>You must be logged in to make a comment</p>
        </div>
      )}
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
    <div>
      <div className="flex">
        <h4>{comment.author}</h4>
        <h5>{new Date(comment.createdAt).toLocaleDateString()}</h5>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}

export default CommentSection;
