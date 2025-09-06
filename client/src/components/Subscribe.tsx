import { useAuth } from "@/context/AuthContext";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormButton from "./FormButton";
import SignUp from "./Signup";
import InputForm from "./InputForm";
import AlertMsg from "./AlertMsg";

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export type Login = z.infer<typeof loginSchema>;

function Subscribe() {
  const { handleLogin, message, setMessage } = useAuth();

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

  return (
    <>
      <div className="absolute top-25 left-1/2 z-50 flex -translate-x-1/2 justify-center">
        <AlertMsg message={message} setMessage={setMessage} />
      </div>
      <div className="font-pt-serif flex h-screen items-center justify-center gap-4 bg-gray-950 p-24 text-white">
        <form
          className="h-full w-[50%] border-2 border-white p-12"
          method="POST"
          onSubmit={handleSubmit(handleLogin)}
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
    </>
  );
}

export default Subscribe;
