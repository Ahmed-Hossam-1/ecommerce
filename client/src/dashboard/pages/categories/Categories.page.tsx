import { Link } from "react-router-dom";
import Table from "../../../components/Table";
import { Column } from "../../../types/type";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../../features/category/api/categorySlice";
import { toast } from "react-toastify";

const Categories_page = () => {
  const columns: Column[] = [
    { key: "categoryId", title: "ID" },
    { key: "categoryName", title: "Name" },
    { key: "categoryDescription", title: "Description" },
  ];

  const { data, isLoading, isError } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteCategory({ categoryId: id });
    if (res.data) {
      toast.success(res.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <Link
          to="addcategory"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Category
        </Link>
      </div>
      <div className="p-4">
        <Table
          columns={columns}
          data={data?.categories ?? []}
          onEdit={(id: string) => `edite/${id}`}
          onDelete={handleDelete}
          isLoading={isLoading}
          isErorr={isError}
        />
      </div>
    </>
  );
};

export default Categories_page;
