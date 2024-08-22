import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomDashInput from '../../components/CustomDashInput';
import { productSchema } from '../../../utils/validations';
import { z } from 'zod';

const AddProduct = () => {
  type addProduct = z.infer<typeof productSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<addProduct>({
    mode: 'onChange',
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<addProduct> = data => {
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

      <CustomDashInput
        id="price"
        label="Price"
        register={register}
        errors={errors}
        placeholder="Enter price"
        type="number"
      />

      <CustomDashInput
        id="productCount"
        label="Product Count"
        register={register}
        errors={errors}
        placeholder="Enter product count"
        type="number"
      />

      <CustomDashInput
        id="category"
        label="Category"
        register={register}
        errors={errors}
        placeholder="Enter category"
        type="number"
      />

      <CustomDashInput
        id="mainImage"
        label="Main Image"
        register={register}
        errors={errors}
        placeholder="Enter main image"
        type="text"
      />

      <CustomDashInput
        id="images"
        label="Images"
        register={register}
        errors={errors}
        placeholder="Enter images"
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

export default AddProduct;
