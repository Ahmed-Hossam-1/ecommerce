import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import { useGetAllUsersQuery } from '../../../features/users/api/userSlice';
import { Column } from '../../../types/type';

const UsersPage = () => {
  const columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
  ];
  const { isLoading, data: userData, isError } = useGetAllUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

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
        <Table columns={columns} data={userData?.users ?? []} onEdit={''} onDelete={() => {}} />
      </div>
    </>
  );
};

export default UsersPage;
