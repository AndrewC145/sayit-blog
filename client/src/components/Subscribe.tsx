import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type User = z.infer<typeof userSchema>;

function Subscribe() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: User) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="font-pt-serif flex h-screen items-center justify-center gap-4 bg-gray-950 p-24 text-white">
      <form
        className="h-full w-[50%] border-2 border-white p-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <h1 className="text-xl font-bold">LOGIN</h1>
          <p className="mb-4">
            Please enter your username and password to log in.
          </p>
        </div>
        <div className="mb-4 space-y-2">
          <Label>Username</Label>
          <Input
            className="rounded-xs p-6"
            type="text"
            placeholder="Enter your username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-red-300">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4 space-y-2">
          <Label>Password</Label>
          <Input
            className="rounded-xs p-6"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
        </div>
        <FormButton text="Login" />
      </form>
      <form className="h-full w-[50%] border-2 border-white p-12">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">NEW USER</h2>
          <h3 className="mb-8">
            Sign up for an account to stay up to date with the latest articles
            and details from sayit, but also to be able to comment on articles.
          </h3>
        </div>
        <FormButton text="Sign Up" />
      </form>
    </div>
  );
}

function FormButton({ text }: { text: string }) {
  return (
    <Button
      type="submit"
      className="text-md mt-4 w-full cursor-pointer bg-white p-6 text-black hover:bg-gray-200"
    >
      {text}
    </Button>
  );
}

export default Subscribe;
