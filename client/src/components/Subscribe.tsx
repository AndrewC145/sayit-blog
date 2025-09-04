/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import * as z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormButton from "./FormButton";
import SignUp from "./Signup";
import InputForm from "./InputForm";
import axios, { type AxiosResponse } from "axios";
import { AuthContext } from "@/context/AuthContext";

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

type Login = z.infer<typeof loginSchema>;

function Subscribe() {
  const { setToken } = useContext(AuthContext);

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

  const PORT = import.meta.env.VITE_PORT as string;

  const login: SubmitHandler<Login> = async (data) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${PORT}/users/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setToken(response.data.accessToken);
      }
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="font-pt-serif flex h-screen items-center justify-center gap-4 bg-gray-950 p-24 text-white">
      <form
        className="h-full w-[50%] border-2 border-white p-12"
        onSubmit={handleSubmit(login)}
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
