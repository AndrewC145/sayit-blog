/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import FormButton from "./FormButton";
import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputForm from "./InputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { type AxiosResponse } from "axios";
import { useAuth } from "@/context/AuthContext";

const userSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(25, "Password must be at most 25 characters long"),
});

type User = z.infer<typeof userSchema>;

function SignUp() {
  const { setMessage } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const PORT = import.meta.env.VITE_PORT as string;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const toggleForm = () => {
    setOpen(!open);
  };

  const registerUser: SubmitHandler<User> = async (data) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${PORT}/users/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        setMessage(response.data.message);
        setOpen(false);
      }
    } catch (error: any) {
      console.error("Error registering user:", error.response.data?.message);
      setMessage(error.response.data?.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className="w-full border-2 border-white p-6 sm:w-[50%] sm:p-12 xl:h-full"
      method="POST"
      onSubmit={handleSubmit(registerUser)}
    >
      {!open ? (
        <div className="space-y-4">
          <h1 className="text-md font-bold sm:text-lg md:text-xl">NEW USER</h1>
          <h2 className="mb-8 text-xs sm:text-sm md:text-base">
            Sign up for an account to stay up to date with the latest articles
            and details from sayit, but also to be able to comment on articles.
          </h2>
          <FormButton handleClick={toggleForm} text="Sign Up" />
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-md font-bold sm:text-lg md:text-xl">
            CREATE ACCOUNT
          </h1>
          <p className="mb-4 text-xs sm:text-sm md:text-base">
            Please enter your username and password to create an account.
          </p>
          <InputForm
            register={register}
            type="text"
            placeholder="Enter your username"
            label="Username"
            errors={errors.username}
          />
          <InputForm
            register={register}
            type="password"
            placeholder="Enter your password"
            label="Password"
            errors={errors.password}
          />
          <FormButton text="Create Account" />
        </div>
      )}
    </form>
  );
}

export default SignUp;
