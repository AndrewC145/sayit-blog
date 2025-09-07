/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as z from "zod";
import FormButton from "./FormButton";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputForm from "./InputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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
} from "./ui/select";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const postSchema = z.object({
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
    .max(1000, { message: "Content must be at most 1000 characters" }),
});

type Post = z.infer<typeof postSchema>;

function CreatePost() {
  const { message, setMessage } = useAuth();
  const [file, setFile] = useState<any | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      file: undefined,
      title: "",
      content: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const currentFile = e.currentTarget.files?.[0];

    if (currentFile) {
      setFile(currentFile);
    }
  };

  return (
    <>
      <div className="absolute top-25 left-1/2 z-50 flex -translate-x-1/2 justify-center">
        <AlertMsg message={message} setMessage={setMessage} />
      </div>

      <div className="font-pt-serif flex h-screen items-center justify-center bg-gray-950 text-white">
        <form
          className="flex w-[50%] flex-col rounded-md border-2 border-white p-12"
          encType="multipart/form-data"
          method="POST"
          onSubmit={handleSubmit(uploadFile)}
        >
          <h1 className="mb-8 text-3xl">Create Post</h1>
          <InputForm
            register={register}
            className="h-full w-[45%] py-3 file:mr-4 file:rounded-sm file:bg-white file:px-4 file:py-1"
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
            <SelectCategory />
          </div>
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
    </>
  );
}

async function uploadFile(
  file: any,
  title: string,
  content: string,
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
): Promise<void> {
  const PORT: string = import.meta.env.VITE_PORT;
  try {
    const formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);

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
}

function SelectCategory() {
  return (
    <Select>
      <SelectTrigger className="w-[180px] p-5">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="technology">Technology</SelectItem>
          <SelectItem value="health">Fashion</SelectItem>
          <SelectItem value="music">Music</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CreatePost;
