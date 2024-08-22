import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '../../../utils/validations';
import CustomDashInput from '../../components/CustomDashInput';
import { z } from 'zod';

const AddUser = () => {
  type createUser = z.infer<typeof createUserSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<createUser>({
    mode: 'onChange',
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit: SubmitHandler<createUser> = data => {
    console.log(data);
    // reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md  p-8  rounded-lg space-y-6">
      <CustomDashInput
        id="name"
        label="Name"
        register={register}
        errors={errors}
        placeholder="Enter name"
        type="text"
      />

      <CustomDashInput
        id="email"
        label="Email"
        register={register}
        errors={errors}
        placeholder="Enter email"
        type="email"
      />

      <CustomDashInput
        id="password"
        label="Password"
        register={register}
        errors={errors}
        placeholder="Enter password"
        type="password"
      />
      <div>
        <label htmlFor="role" className="block text-gray-700 text-sm font-semibold mb-1">
          Role
        </label>
        <select
          id="role"
          {...register('role')}
          className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="" disabled selected>
            Select Role
          </option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default AddUser;
