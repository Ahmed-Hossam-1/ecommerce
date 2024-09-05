import { Link } from "react-router-dom";
import Table from "../../../components/Table";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../../features/users/api/userSlice";
import { Column } from "../../../types/type";
import { toast } from "react-toastify";

const UsersPage = () => {
  const columns: Column[] = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "role", title: "Role" },
  ];
  const { isLoading, data: userData, isError } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteUser({ id });
    console.log(res);
    res.data && toast.success(res.data.message);
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <Link
          to="adduser"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </Link>
      </div>
      <div className="p-4">
        <Table
          columns={columns}
          data={userData?.users ?? []}
          onEdit={(id: string) => `edite/${id}`}
          onDelete={handleDelete}
          isLoading={isLoading}
          isErorr={isError}
        />
      </div>
    </>
  );
};

export default UsersPage;
