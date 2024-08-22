import { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface Tprops {
  register: UseFormRegister<HTMLInputElement>;
  id: string;
  errors: Record<string, FieldError | undefined>;
  type: string;
  placeholder: string;
  label: string;
}

const CustomDashInput: FC<Tprops> = ({ id, label, register, errors, placeholder, type }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 text-sm font-semibold mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        placeholder={placeholder}
        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
    </div>
  );
};

export default CustomDashInput;
