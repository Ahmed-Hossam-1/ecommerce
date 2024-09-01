import { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<HTMLInputElement>;
  id: string;
  errors: Record<string, FieldError | undefined>;
  type: string;
  placeholder: string;
  label: string;
}

const CustomInput: FC<InputProps> = ({
  register,
  id,
  errors,
  type,
  placeholder,
  label,
}) => {
  return (
    <div className="flex flex-col justify-center items-start">
      <label
        className="block dark:text-mainTextDark capitalize text-gray-700 text-sm font-semibold mb-1 tracking-wide"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="w-[350px] border-b-2 border-blue-500 px-3 py-2 focus:border-blue-500 outline-none"
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
      />
      {errors[id] && (
        <span className="text-red-500 text-xs mt-1"> {errors[id].message}</span>
      )}
    </div>
  );
};

export default CustomInput;
