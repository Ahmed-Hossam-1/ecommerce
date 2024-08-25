/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomDashInput from "../../components/CustomDashInput";
import { categorySchema } from "../../../utils/validations";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../../features/category/api/categorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UseFormCategory = ({ isEdit }: { isEdit: boolean }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const nav = useNavigate();

  type TCategory = z.infer<typeof categorySchema>;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    // reset,
  } = useForm<TCategory>({
    mode: "onChange",
    resolver: zodResolver(categorySchema),
  });

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const { data: categoryData } = useGetCategoryByIdQuery(categoryId, {
    skip: !isEdit,
  });
  console.log(categoryData);
  useEffect(() => {
    if (isEdit && categoryId) {
      setValue("categoryName", categoryData?.category.categoryName);
      setValue(
        "categoryDescription",
        categoryData?.category.categoryDescription
      );
    }
  }, [categoryData]);

  const onSubmit: SubmitHandler<TCategory> = async (data) => {
    if (isEdit && categoryId) {
      const res = await updateCategory({ ...data, categoryId });
      res.data && nav("/admin_page/categories");
      toast.success(res.data.message);
    } else {
      const res = await createCategory(data);
      res.data && nav("/admin_page/categories");
      toast.success(res.data.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md  p-8  rounded-lg space-y-6"
    >
      <CustomDashInput
        id="categoryName"
        label="Name"
        register={register}
        errors={errors}
        placeholder="Enter name"
        type="text"
      />

      <CustomDashInput
        id="categoryDescription"
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

export default UseFormCategory;
