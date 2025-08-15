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
  const { register, handleSubmit } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: User) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="flex items-center justify-center gap-4 text-white">
      <form
        className="w-[50%] border-2 border-white p-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1>LOGIN</h1>
          <p>Please enter your username and password to log in.</p>
        </div>
        <div>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Enter your username"
            {...register("username")}
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
        </div>
        <Button
          type="submit"
          className="mt-4 w-full bg-red-300 hover:bg-red-400"
        >
          Log In
        </Button>
      </form>
      <form className="w-[50%] border-2 border-white p-12">
        <div>
          <h2>NEW USER</h2>
          <h3>
            Sign up for an account to stay up to date with the latest articles
            and details from sayit
          </h3>
        </div>
        <Button className="mt-4 w-full bg-red-300 hover:bg-red-400">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Subscribe;
