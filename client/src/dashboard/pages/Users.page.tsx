import Table from '../../components/Table';
import { useGetAllUsersQuery } from '../../features/users/api/userSlice';
import { Column } from '../../types/type';

const UsersPage = () => {
  const columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
  ];

  const { isLoading, data: userData } = useGetAllUsersQuery();

  if (isLoading) return <div>Loading...</div>;

  // const data: DataItem[] = [
  //   { id: 1, name: 'Product 1', price: '$10.00' },
  //   { id: 2, name: 'Product 2', price: '$20.00' },
  //   { id: 3, name: 'Product 3', price: '$30.00' },
  // ];
  return (
    <div className="p-4">
      <Table columns={columns} data={userData?.users} />
    </div>
  );
};

export default UsersPage;
