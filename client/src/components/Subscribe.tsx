import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormButton from "./FormButton";
import SignUp from "./Signup";
import InputForm from "./InputForm";

const userSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

type User = z.infer<typeof userSchema>;

function Subscribe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        <InputForm
          key={"login-username"}
          register={register}
          label="Username"
          type="text"
          placeholder="Enter your username"
          errors={errors?.username}
        />
        <InputForm
          key={"login-password"}
          register={register}
          label="Password"
          type="password"
          placeholder="Enter your password"
          errors={errors?.password}
        />
        <FormButton text="Login" />
      </form>
      <SignUp register={register} errors={errors} />
    </div>
  );
}

export default Subscribe;
