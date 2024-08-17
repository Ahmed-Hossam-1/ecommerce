import Table from '../../components/Table';
import { Column } from '../../types/type';

const Seller_req_page = () => {
  const columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
  ];

  const sellerReq = [{ id: 1, name: 'John Doe', email: 'jon@gamil.com' }];
  return (
    <>
      <div className="p-4">
        <Table columns={columns} data={sellerReq} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </>
  );
};

export default Seller_req_page;
