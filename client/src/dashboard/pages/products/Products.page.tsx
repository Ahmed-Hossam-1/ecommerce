import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import { Column } from '../../../types/type';

const Products_page = () => {
  const columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'description', title: 'Description' },
    { key: 'stockQuantity', title: 'Stock Quantity' },
    { key: 'price', title: 'Price' },
  ];

  const product = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      stockQuantity: 10,
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Product 2 description',
      stockQuantity: 20,
      price: 200,
    },
  ];
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
      <div className="p-4">
        <Table columns={columns} data={product} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </>
  );
};

export default Products_page;
