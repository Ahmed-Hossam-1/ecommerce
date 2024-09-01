import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomDashInput from "../../components/CustomDashInput";
import { productSchema } from "../../../utils/validations";
import ProductMainImage from "../../../components/uploadImages/ProductMainImage";
import ProductImages from "../../../components/uploadImages/ProductImages";
import { useGetAllCategoriesQuery } from "../../../features/category/api/categorySlice";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductQuery,
} from "../../../features/product/api/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const UseFormProduct = ({ isEdit }: { isEdit: boolean }) => {
  const { productId } = useParams<{ productId: string }>();
  type AddProduct = z.infer<typeof productSchema>;
  const nav = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddProduct>({
    mode: "onChange",
    resolver: zodResolver(productSchema),
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { data: categories } = useGetAllCategoriesQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const {
    data: singleProduct,
    isLoading,
    isError,
  } = useGetProductQuery(
    { productId },
    {
      skip: !isEdit,
    }
  );

  useEffect(() => {
    if (isEdit && singleProduct) {
      reset({
        name: singleProduct.product.name,
        description: singleProduct.product.description,
        price: singleProduct.product.price,
        quantity: singleProduct.product.quantity,
        categoryId: singleProduct.product.categoryId,
      });
    }
  }, [isEdit, singleProduct, reset]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const handleMainImageChange = (file: File) => {
    setMainImage(file);
  };

  const handleUploadedImagesChange = (files: File[]) => {
    setUploadedImages(files);
  };

  const onSubmit: SubmitHandler<AddProduct> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("categoryId", data.categoryId);
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    if (uploadedImages.length > 0) {
      uploadedImages.forEach((image) => {
        formData.append("images", image);
      });
    }

    if (isEdit && productId) {
      const res = await updateProduct({
        id: productId,
        data,
      });
      res.data && nav("/admin_page/products");
      res.data && toast.success("Product updated successfully");
    } else {
      const res = await createProduct(formData);
      res.data && nav("/admin_page/products");
      res.data && toast.success("Product created successfully");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg p-8 rounded-lg space-y-6"
    >
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
        type="text"
      />

      <CustomDashInput
        id="quantity"
        label="Product Count"
        register={register}
        errors={errors}
        placeholder="Enter product count"
        type="text"
      />

      <div className="flex flex-col">
        <label
          htmlFor="category"
          className="mb-2 font-semibold dark:text-mainTextDark"
        >
          Category
        </label>
        <select
          id="category"
          {...register("categoryId")}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select a category</option>

          {categories?.categories.map((category) => (
            <option
              className="text-black"
              key={category.categoryId}
              value={category.categoryId}
            >
              {category.categoryName}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
        )}
      </div>

      {!isEdit && (
        <>
          <ProductMainImage
            setImg={handleMainImageChange}
            uploadedImg={mainImage}
            labelImg="Main Image"
          />

          <ProductImages
            uploadedImages={uploadedImages}
            setUploadedImages={handleUploadedImagesChange}
          />
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isEdit ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default UseFormProduct;
