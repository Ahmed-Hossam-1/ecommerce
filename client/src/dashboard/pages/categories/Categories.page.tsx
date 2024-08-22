import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import { Column } from '../../../types/type';

const Categories_page = () => {
  const columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'description', title: 'Description' },
  ];

  const category = [
    { id: 1, name: 'Category 1', description: 'Category 1 description' },
    { id: 2, name: 'Category 2', description: 'Category 2 description' },
  ];
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
        <Table columns={columns} data={category} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </>
  );
};

export default Categories_page;
