/* eslint-disable @typescript-eslint/no-explicit-any */
import FormButton from "./FormButton";
import { useState } from "react";
import InputForm from "./InputForm";

function SignUp({ register, errors }: { register?: any; errors?: any }) {
  const [open, setOpen] = useState(false);

  const toggleForm = () => {
    setOpen(!open);
  };

  return (
    <form className="h-full w-[50%] border-2 border-white p-12">
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
            key={"signup-username"}
            register={register}
            type="text"
            placeholder="Enter your username"
            label="Username"
            errors={errors?.newUsername}
          />
          <InputForm
            key={"signup-password"}
            register={register}
            type="password"
            placeholder="Enter your password"
            label="Password"
            errors={errors?.newPassword}
          />
          <FormButton text="Create Account" />
        </div>
      )}
    </form>
  );
}

export default SignUp;
