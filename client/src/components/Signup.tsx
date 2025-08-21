import * as z from "zod";
import FormButton from "./FormButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "./InputForm";
import { zodResolver } from "@hookform/resolvers/zod";

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

function SignUp() {
  const [open, setOpen] = useState(false);
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

  const toggleForm = () => {
    setOpen(!open);
  };

  return (
    <form
      className="h-full w-[50%] border-2 border-white p-12"
      onSubmit={handleSubmit((data) => console.log("Form submitted:", data))}
    >
      {!open ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">NEW USER</h2>
          <h3 className="mb-8">
            Sign up for an account to stay up to date with the latest articles
            and details from sayit, but also to be able to comment on articles.
          </h3>
          <FormButton handleClick={toggleForm} text="Sign Up" />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">CREATE ACCOUNT</h2>
          <p className="mb-4">
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
