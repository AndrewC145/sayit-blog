/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import FormButton from "./FormButton";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import InputForm from "./InputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import axios, { type AxiosResponse } from "axios";
import AlertMsg from "./AlertMsg";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const postSchema = z.object({
  id: z.string().optional(),
  file: z
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
    .max(3000, { message: "Content must be at most 3000 characters" }),
  category: z.string().nonempty({ message: "Category is required" }),
  authorId: z.string(),
  comments: z.array(z.any()).optional(),
});

export type Post = z.infer<typeof postSchema>;

function CreatePost() {
  const { message, setMessage, user } = useAuth();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      file: undefined,
      title: "",
      content: "",
      category: "",
      authorId: String(user?.id),
    },
  });

  const uploadFile: SubmitHandler<Post> = async (data) => {
    const PORT: string = import.meta.env.VITE_PORT;
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("category", data.category);
      formData.append("authorId", data.authorId);

      const response: AxiosResponse = await axios.post(
        `${PORT}/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        setMessage(response.data?.message);
      }
    } catch (error: any) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div className="absolute top-25 left-1/2 z-50 flex -translate-x-1/2 justify-center">
        <AlertMsg message={message} setMessage={setMessage} />
      </div>

      <div className="font-pt-serif flex h-screen items-center justify-center bg-gray-950 text-white">
        <form
          className="flex w-[85%] flex-col rounded-md border-2 border-white p-8 sm:w-[75%] md:w-[50%] md:p-12"
          encType="multipart/form-data"
          method="POST"
          onSubmit={handleSubmit(uploadFile)}
        >
          <h1 className="mb-8 text-xl sm:text-2xl lg:text-3xl">Create Post</h1>
          <input type="hidden" {...register("authorId")} value={user?.id} />
          <InputForm
            register={register}
            className="h-full w-full py-3 file:mr-4 file:rounded-sm file:bg-white file:px-4 file:py-1 sm:w-[80%] md:text-base lg:w-[60%] xl:w-[45%]"
            label="File"
            type="file"
            placeholder="Choose a file"
            errors={errors?.file}
          />
          <InputForm
            register={register}
            label="Title"
            type="text"
            placeholder="Enter a title"
            errors={errors?.title}
          />
          <div className="my-4 w-full space-y-2">
            <Label>Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => <SelectCategory {...field} />}
            />
            {errors?.category && (
              <p className="text-red-300">{errors.category.message}</p>
            )}
          </div>
          <div className="mb-4 w-full space-y-2">
            <Label>Content</Label>
            <Textarea
              className="rounded-xs p-4 text-sm md:text-base"
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
    </>
  );
}

function SelectCategory({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px] p-5">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="tech">Technology</SelectItem>
          <SelectItem value="fashion">Fashion</SelectItem>
          <SelectItem value="music">Music</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CreatePost;
