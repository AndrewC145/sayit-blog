import * as z from "zod";
import FormButton from "./FormButton";
import { useForm } from "react-hook-form";
import InputForm from "./InputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const postSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max size is 5MB")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, .webp formats are supported",
    ),
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z
    .string()
    .min(20, { message: "Content must be at least 20 characters" })
    .max(1000, { message: "Content must be at most 1000 characters" }),
});

type Post = z.infer<typeof postSchema>;

function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      image: undefined,
      title: "",
      content: "",
    },
  });

  return (
    <div className="font-pt-serif flex h-screen items-center justify-center bg-gray-950 text-white">
      <form
        className="flex w-[50%] flex-col rounded-md border-2 border-white p-12"
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <h1 className="mb-8 text-3xl">Create Post</h1>
        <InputForm
          register={register}
          className="h-full w-[45x%] py-3 file:mr-4 file:rounded-sm file:bg-white file:px-4"
          label="Image"
          type="file"
          placeholder="Choose a file"
          errors={errors?.image}
        />
        <InputForm
          register={register}
          label="Title"
          type="text"
          placeholder="Enter a title"
          errors={errors?.title}
        />
        <div className="mb-4 w-full space-y-2">
          <Label>Content</Label>
          <Textarea
            className="rounded-xs p-4"
            placeholder="Write your post content here"
            {...register("content", { required: true })}
          />
          {errors?.content && (
            <p className="text-red-300">{errors.content.message}</p>
          )}
        </div>
        <FormButton text="Submit Post" />
      </form>
    </div>
  );
}

export default CreatePost;
