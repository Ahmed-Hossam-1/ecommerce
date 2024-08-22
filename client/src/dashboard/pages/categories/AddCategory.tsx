import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomDashInput from '../../components/CustomDashInput';
import { categorySchema } from '../../../utils/validations';
import { z } from 'zod';

const AddCategory = () => {
  type addCategory = z.infer<typeof categorySchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<addCategory>({
    mode: 'onChange',
    resolver: zodResolver(categorySchema),
  });

  const onSubmit: SubmitHandler<addCategory> = data => {
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
        id="description"
        label="Description"
        register={register}
        errors={errors}
        placeholder="Enter description"
        type="text"
      />

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

export default AddCategory;
