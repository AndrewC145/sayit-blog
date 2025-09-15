/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
  className = "rounded-xs text-xs sm:text-sm md:text-base placeholder:text-xs p-3 sm:p-6",
  label,
  placeholder,
  type,
  errors,
}: InputFormProps) {
  const inputId = label.toLowerCase() + "-input";
  return (
    <div className="mb-4 space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        className={className}
        type={type || "text"}
        placeholder={placeholder}
        {...register(label.toLowerCase(), { required: true })}
      />
      {errors && <p className="text-red-300">{errors.message}</p>}
    </div>
  );
}

export default InputForm;
