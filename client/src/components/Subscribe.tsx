import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormButton from "./FormButton";
import SignUp from "./Signup";
import InputForm from "./InputForm";
import { Alert, AlertTitle } from "./ui/alert";
import { type AuthContextType } from "@/context/AuthContext";
import { MessageSquare } from "lucide-react";

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export type Login = z.infer<typeof loginSchema>;

type AlertProps = Pick<AuthContextType, "message" | "setMessage">;

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
      <div className="fixed top-25 left-1/2 z-50 flex -translate-x-1/2 justify-center">
        <AlertMsg message={message} setMessage={setMessage} />
      </div>
      <div className="font-pt-serif flex h-screen items-center justify-center gap-4 bg-gray-950 p-24 text-white">
        <form
          className="h-full w-[50%] border-2 border-white p-12"
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

function AlertMsg({ message, setMessage }: AlertProps) {
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setShown(true);
      const timer = setTimeout(() => {
        setShown(false);
        setMessage(undefined);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!shown || !message) return null;

  return (
    <Alert
      className="w-[30vw] rounded-md border-1 border-gray-500 bg-[#242424] text-white"
      variant="default"
    >
      <MessageSquare />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}

export default Subscribe;
