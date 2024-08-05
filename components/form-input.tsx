import { HTMLInputTypeAttribute } from "react";

interface FormInputProps {
  type: HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  required?: boolean;
  errors?: string[];
}

export default function FormInput({
  type,
  name,
  placeholder = "",
  required = false,
  errors = [],
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        className="bg-transparent px-3 border-none rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 placeholder:text-neutral-400"
        name={name}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, i) => (
        <span key={i} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
