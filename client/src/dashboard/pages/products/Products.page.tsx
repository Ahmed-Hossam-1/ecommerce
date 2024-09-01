import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetProductsBySellerQuery,
} from "../../../features/product/api/productSlice";
import { Link } from "react-router-dom";
import Table from "../../../components/Table";
import { Column } from "../../../types/type";
import { toast } from "react-toastify";
import { useCurrentUserQuery } from "../../../features/users/api/userSlice";

const Products_page = () => {
  const { data: currentUser } = useCurrentUserQuery();
  const columns: Column[] = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "description", title: "Description" },
    { key: "quantity", title: "Stock Quantity" },
    { key: "price", title: "Price" },
  ];
  const { data: products, isLoading, isError } = useGetAllProductsQuery();
  const {
    data: productsBySeller,
    isLoading: isLoadingBySeller,
    isError: isErrorBySeller,
  } = useGetProductsBySellerQuery();

  console.log("productsBySeller", productsBySeller);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteProduct(id);
    res.data && toast.success(res.data.message);
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <Link
          to="addproduct"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </Link>
      </div>
      {currentUser?.user?.role === "seller" ? (
        <div className="p-4">
          <Table
            columns={columns}
            data={productsBySeller?.products ?? []}
            onEdit={(id: string) => `edit/${id}`}
            onDelete={handleDelete}
            isLoading={isLoadingBySeller}
            isErorr={isErrorBySeller}
          />
        </div>
      ) : (
        <div className="p-4">
          <Table
            columns={columns}
            data={products?.products ?? []}
            onEdit={(id: string) => `edit/${id}`}
            onDelete={handleDelete}
            isLoading={isLoading}
            isErorr={isError}
          />
        </div>
      )}
    </>
  );
};

export default Products_page;
