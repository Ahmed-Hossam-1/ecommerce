import Table from '../../../components/Table';
import { useGetAllSellerReqQuery } from '../../../features/seller_req/api/seller_reqSlice';
import { Column } from '../../../types/type';

const Seller_req_page = () => {
  const columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'userId', title: 'User ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
  ];
  const { isLoading, isError, data } = useGetAllSellerReqQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(data?.requests);
  return (
    <>
      <div className="p-4">
        <Table
          columns={columns}
          data={data?.requests ?? []}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </div>
    </>
  );
};

export default Seller_req_page;
