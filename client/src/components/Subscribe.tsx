import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormButton from "./FormButton";
import SignUp from "./Signup";
import InputForm from "./InputForm";

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

type Login = z.infer<typeof loginSchema>;

function Subscribe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: Login) => {
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
          register={register}
          label="Username"
          type="text"
          placeholder="Enter your username"
          errors={errors?.username}
        />
        <InputForm
          register={register}
          label="Password"
          type="password"
          placeholder="Enter your password"
          errors={errors?.password}
        />
        <FormButton text="Login" />
      </form>
      <SignUp />
    </div>
  );
}

export default Subscribe;
