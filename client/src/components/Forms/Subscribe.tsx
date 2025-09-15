import { useEffect } from "react";
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
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <div className="absolute top-20 left-1/2 z-50 flex -translate-x-1/2 justify-center sm:top-22">
        <AlertMsg message={message} setMessage={setMessage} />
      </div>
      <div className="font-pt-serif items-stretch justify-center gap-4 bg-gray-950 px-8 py-20 text-white sm:flex-row sm:px-12 md:items-center lg:p-24 xl:h-full">
        <div className="flex h-full flex-col items-stretch gap-8 sm:flex-row">
          <form
            className="w-full border-2 border-white p-6 sm:w-[50%] sm:p-12 xl:h-full"
            method="POST"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="space-y-4">
              <h1 className="text-md font-bold sm:text-lg md:text-xl">LOGIN</h1>
              <p className="mb-4 text-xs sm:text-sm md:text-base">
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
      </div>
    </>
  );
}

export default Subscribe;
