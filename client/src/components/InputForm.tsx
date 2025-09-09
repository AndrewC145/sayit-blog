/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type InputFormProps = {
  register: any;
  className?: string;
  label: string;
  placeholder: string;
  type?: string;
  errors?: { message?: string };
};

function InputForm({
  register,
  className = "rounded-xs p-6",
  label,
  placeholder,
  type,
  errors,
}: InputFormProps) {
  return (
    <div className="mb-4 space-y-2">
      <Label>{label}</Label>
      <Input
        className={className}
        name={label.toLowerCase()}
        type={type || "text"}
        placeholder={placeholder}
        {...register(label.toLowerCase(), { required: true })}
      />
      {errors && <p className="text-red-300">{errors.message}</p>}
    </div>
  );
}

export default InputForm;
